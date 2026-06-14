import { Component, ElementRef, OnInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  phase: number;
  phaseSpeed: number;
  drift: number;
  isRipple?: boolean;
}

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class Cursor implements OnInit, OnDestroy {
  @ViewChild('cursorDot', { static: true }) cursorDot!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorRing', { static: true }) cursorRing!: ElementRef<HTMLDivElement>;
  @ViewChild('trailCanvas', { static: true }) trailCanvas!: ElementRef<HTMLCanvasElement>;

  // Component visual state bindings
  isVisible = false;
  isTouchDevice = false;
  isHovered = false;
  isTextHovered = false;
  isClicking = false;

  // Easing coordinates and sizes
  private mouse = { x: 0, y: 0 };
  private dot = { x: 0, y: 0 };
  private ring = { x: 0, y: 0 };
  
  // Custom cursor interpolation states (managed at 60 FPS in JavaScript)
  private dotScale = 1.0;
  private dotOpacity = 0.0;
  private ringScale = 1.0;
  private ringOpacity = 0.0;
  private ringWidth = 36;
  private ringHeight = 36;

  // Dynamic glow and particle effects based on velocity
  private lastMouse = { x: 0, y: 0 };
  private velocity = 0;
  private animationFrameId?: number;

  // Particle physics canvas states
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];

  // Card proximity glowing states
  private hoverGlowElements: HTMLElement[] = [];
  private intervalId?: any;

  constructor(
    private elRef: ElementRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // Check if the device is touch-enabled
    this.isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      (window.matchMedia && window.matchMedia('(hover: none)').matches);

    if (this.isTouchDevice) {
      return;
    }

    // Hide native cursor globally
    document.documentElement.classList.add('custom-cursor-active');

    // Run animation frames and mouse listeners outside NgZone to avoid triggering Angular Change Detection
    this.ngZone.runOutsideAngular(() => {
      this.initCanvas();
      
      this.updateGlowElements();
      this.intervalId = setInterval(() => this.updateGlowElements(), 2000);
      
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('mousedown', this.onMouseDown, { passive: true });
      window.addEventListener('mouseup', this.onMouseUp, { passive: true });
      window.addEventListener('mouseover', this.onMouseOver, { passive: true });
      window.addEventListener('resize', this.onResize, { passive: true });
      document.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
      document.addEventListener('mouseenter', this.onMouseEnter, { passive: true });

      // Start rendering loop
      this.tick();
    });
  }

  ngOnDestroy() {
    if (this.isTouchDevice) return;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    document.documentElement.classList.remove('custom-cursor-active');

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mouseover', this.onMouseOver);
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('mouseleave', this.onMouseLeave);
    document.removeEventListener('mouseenter', this.onMouseEnter);
  }

  private initCanvas() {
    const canvas = this.trailCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.onResize();
  }

  private onResize = () => {
    const canvas = this.trailCanvas.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(dpr, dpr);
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.isVisible) {
      // Snap positions immediately on first movement to avoid sliding from (0,0)
      this.dot.x = e.clientX;
      this.dot.y = e.clientY;
      this.ring.x = e.clientX;
      this.ring.y = e.clientY;
      
      this.ngZone.run(() => {
        this.isVisible = true;
      });
    }

    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    // Calculate mouse speed for dynamic glow
    const dx = this.mouse.x - this.lastMouse.x;
    const dy = this.mouse.y - this.lastMouse.y;
    this.velocity = Math.sqrt(dx * dx + dy * dy);
    this.lastMouse.x = this.mouse.x;
    this.lastMouse.y = this.mouse.y;

    // Calculate normalized coordinates for parallax background offsets
    const offsetX = (this.mouse.x / window.innerWidth) - 0.5;
    const offsetY = (this.mouse.y / window.innerHeight) - 0.5;
    document.documentElement.style.setProperty('--mouse-offset-x', offsetX.toString());
    document.documentElement.style.setProperty('--mouse-offset-y', offsetY.toString());

    // Proximity highlighting for nearby hover-glow elements (Fluent spotlight effect)
    this.hoverGlowElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(this.mouse.x - centerX, this.mouse.y - centerY);
      const maxProximityDist = 280; // active highlight radius

      if (dist < maxProximityDist) {
        const proximity = 1 - dist / maxProximityDist;
        el.style.setProperty('--proximity', proximity.toString());
        
        // Calculate and apply relative coordinates for spot gradient
        const x = this.mouse.x - rect.left;
        const y = this.mouse.y - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
      } else {
        el.style.setProperty('--proximity', '0');
      }
    });
  };

  private onMouseDown = () => {
    this.ngZone.run(() => {
      this.isClicking = true;
    });
    this.spawnClickRipple(this.mouse.x, this.mouse.y);
  };

  private onMouseUp = () => {
    this.ngZone.run(() => {
      this.isClicking = false;
    });
  };

  private onMouseLeave = () => {
    this.ngZone.run(() => {
      this.isVisible = false;
    });
  };

  private onMouseEnter = () => {
    this.ngZone.run(() => {
      this.isVisible = true;
    });
  };

  private onMouseOver = (e: MouseEvent) => {
    let target = e.target as HTMLElement | null;
    
    let foundInteractive = false;
    let foundText = false;

    while (target && target !== document.documentElement) {
      const tagName = target.tagName;
      
      // Check for buttons, navigation items, links, cards, or custom interactives
      if (
        tagName === 'BUTTON' || 
        tagName === 'A' || 
        target.classList.contains('btn') || 
        target.classList.contains('nav-link') || 
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive') ||
        target.classList.contains('info-card') ||
        target.classList.contains('project-card') ||
        target.classList.contains('skill-card')
      ) {
        foundInteractive = true;
        break;
      }

      // Check for prominent typography to trigger text insertion cursor
      if (
        tagName === 'H1' || 
        tagName === 'H2' || 
        tagName === 'H3' || 
        tagName === 'H4' || 
        target.classList.contains('text-glitch')
      ) {
        foundText = true;
        break;
      }

      target = target.parentElement;
    }

    // Update state flags
    this.ngZone.run(() => {
      if (foundInteractive) {
        this.isHovered = true;
        this.isTextHovered = false;
      } else if (foundText) {
        this.isHovered = false;
        this.isTextHovered = true;
      } else {
        this.isHovered = false;
        this.isTextHovered = false;
      }
    });
  };

  private spawnParticle() {
    if (this.isTextHovered) return;

    // Alternate color matching neon theme (blue/purple)
    const isBlue = Math.random() > 0.45;
    const color = isBlue ? 'rgba(0, 242, 254, ALPHA)' : 'rgba(177, 0, 255, ALPHA)';

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.4 + 0.15;

    this.particles.push({
      x: this.dot.x,
      y: this.dot.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 2.5 + 1.0,
      color: color,
      alpha: 0.7,
      decay: Math.random() * 0.012 + 0.006,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.03 + 0.01,
      drift: Math.random() * 0.3 + 0.05
    });
  }

  private spawnClickRipple(x: number, y: number) {
    // Outer expanding ring ripple
    this.particles.push({
      x: x,
      y: y,
      vx: 0,
      vy: 0,
      size: 8,
      color: 'rgba(0, 242, 254, ALPHA)',
      alpha: 1.0,
      decay: 0.02,
      phase: 0,
      phaseSpeed: 0,
      drift: 0,
      isRipple: true
    });

    // Expanding spark explosions
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.3;
      const speed = Math.random() * 3.0 + 1.8;
      const isBlue = Math.random() > 0.5;
      const color = isBlue ? 'rgba(0, 242, 254, ALPHA)' : 'rgba(177, 0, 255, ALPHA)';

      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.2 + 0.8,
        color: color,
        alpha: 0.95,
        decay: Math.random() * 0.03 + 0.012,
        phase: 0,
        phaseSpeed: 0,
        drift: 0
      });
    }
  }

  private tick = () => {
    // 1. Sizing, Easing Targets
    let targetRingWidth = 36;
    let targetRingHeight = 36;
    let targetRingScale = 1.0;
    let targetRingOpacity = 1.0;
    
    let targetDotScale = 1.0;
    let targetDotOpacity = 1.0;

    if (this.isHovered) {
      // Hovering state: expand ring
      targetRingWidth = 56;
      targetRingHeight = 56;
      targetRingScale = this.isClicking ? 0.82 : 1.0;
      targetRingOpacity = 1.0;

      targetDotScale = this.isClicking ? 0.65 : 1.0;
      targetDotOpacity = 1.0;
    } else if (this.isTextHovered) {
      // Text hover I-beam state
      targetRingWidth = 0;
      targetRingHeight = 0;
      targetRingScale = 0.0;
      targetRingOpacity = 0.0;

      targetDotScale = 1.0;
      targetDotOpacity = 1.0;
    } else {
      // Empty space float state
      targetRingWidth = 36;
      targetRingHeight = 36;
      targetRingScale = this.isClicking ? 0.8 : 1.0;
      targetRingOpacity = 1.0;

      targetDotScale = this.isClicking ? 0.75 : 1.0;
      targetDotOpacity = 1.0;
    }

    // 2. Linear Easing Interpolations (Smooth 60 FPS update)
    const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

    this.dot.x = lerp(this.dot.x, this.mouse.x, 0.35); // Responsive dot
    this.dot.y = lerp(this.dot.y, this.mouse.y, 0.35);

    this.ring.x = lerp(this.ring.x, this.mouse.x, 0.12); // Lagging outer ring
    this.ring.y = lerp(this.ring.y, this.mouse.y, 0.12);

    this.ringWidth = lerp(this.ringWidth, targetRingWidth, 0.18);
    this.ringHeight = lerp(this.ringHeight, targetRingHeight, 0.18);
    
    this.ringScale = lerp(this.ringScale, targetRingScale, 0.18);
    this.ringOpacity = lerp(this.ringOpacity, targetRingOpacity, 0.18);
    
    this.dotScale = lerp(this.dotScale, targetDotScale, 0.22);
    this.dotOpacity = lerp(this.dotOpacity, targetDotOpacity, 0.22);

    // Directly update DOM element styles for maximum frame rates without Angular overhead
    if (this.cursorDot?.nativeElement) {
      const dotEl = this.cursorDot.nativeElement;
      dotEl.style.transform = `translate3d(${this.dot.x}px, ${this.dot.y}px, 0) translate3d(-50%, -50%, 0) scale(${this.dotScale})`;
      dotEl.style.opacity = this.dotOpacity.toString();
    }

    if (this.cursorRing?.nativeElement) {
      const ringEl = this.cursorRing.nativeElement;
      ringEl.style.transform = `translate3d(${this.ring.x}px, ${this.ring.y}px, 0) translate3d(-50%, -50%, 0) scale(${this.ringScale})`;
      ringEl.style.width = `${this.ringWidth}px`;
      ringEl.style.height = `${this.ringHeight}px`;
      ringEl.style.opacity = this.ringOpacity.toString();
    }

    // 3. Particle Canvas Drawing Logic
    if (this.ctx) {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Spawn trail particles based on mouse movement speed
      if (this.isVisible && !this.isTouchDevice && this.velocity > 0.4) {
        const particlesToSpawn = Math.min(2, Math.floor(this.velocity / 10) + 1);
        for (let i = 0; i < particlesToSpawn; i++) {
          this.spawnParticle();
        }
      }

      // Update, draw, and filter canvas particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        if (p.isRipple) {
          p.size += 1.8;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.strokeStyle = p.color.replace('ALPHA', p.alpha.toString());
          this.ctx.lineWidth = 1.8;
          this.ctx.stroke();
        } else {
          // Slow down horizontal velocities and float upward gently
          p.phase += p.phaseSpeed;
          p.vx *= 0.96;
          p.vy = p.vy * 0.96 - 0.06; // Upward drift physics
          p.x += p.vx + Math.sin(p.phase) * p.drift;
          p.y += p.vy;

          // Double layer circles for high performance neon glowing effect:
          // Outer blur glow circle
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          this.ctx.fillStyle = p.color.replace('ALPHA', (p.alpha * 0.25).toString());
          this.ctx.fill();

          // Inner solid core
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fillStyle = p.color.replace('ALPHA', p.alpha.toString());
          this.ctx.fill();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  private updateGlowElements() {
    this.hoverGlowElements = Array.from(document.querySelectorAll('.hover-glow')) as HTMLElement[];
  }
}
