import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, HostListener } from '@angular/core';

interface ParticleState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
}

@Component({
  selector: 'app-particles',
  templateUrl: './particles.html',
  styleUrl: './particles.scss',
  standalone: true
})
export class Particles implements AfterViewInit, OnDestroy {
  @ViewChild('neuralCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private particleCount = 90;
  private connectionDistance = 115;
  private animationId!: number;

  // Background spotlight tracking and trails
  private mouse = { x: 0, y: 0 };
  private mouseHistory: { x: number, y: number }[] = [];
  private ripples: { x: number, y: number, radius: number, opacity: number }[] = [];
  private hasMouseMoved = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    
    // Setup listeners and animations outside Angular's zone to prevent change detection fires
    this.ngZone.runOutsideAngular(() => {
      this.createParticles();

      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('mousedown', this.onMouseDown, { passive: true });
      
      this.animate();
    });
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousedown', this.onMouseDown);
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
    this.createParticles();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.particleCount = window.innerWidth < 768 ? 35 : 90;
  }

  private createParticles() {
    this.particles = [];
    const canvas = this.canvasRef.nativeElement;
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(canvas.width, canvas.height));
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.hasMouseMoved = true;

    // Push coordinates to mouse history for trail rendering
    this.mouseHistory.push({ x: this.mouse.x, y: this.mouse.y });
    if (this.mouseHistory.length > 8) {
      this.mouseHistory.shift();
    }
  };

  private onMouseDown = (e: MouseEvent) => {
    // Spawn expanding click ripples
    this.ripples.push({
      x: e.clientX,
      y: e.clientY,
      radius: 6,
      opacity: 0.65
    });
  };

  private drawConnections(activeX: number, activeY: number) {
    const hoverThreshold = 180;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        
        if (dist < this.connectionDistance) {
          // Calculate if the midpoint of the line is near the cursor
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const distToMouse = Math.hypot(midX - activeX, midY - activeY);
          
          let alpha = (1 - dist / this.connectionDistance) * 0.16;
          let color = 'rgba(177, 0, 255, ALPHA)'; // Default purple connections
          
          if (distToMouse < hoverThreshold) {
            const factor = 1 - distToMouse / hoverThreshold; // 0 to 1
            alpha = alpha + factor * 0.35; // Brighten connection lines significantly
            color = 'rgba(0, 242, 254, ALPHA)'; // Transition to neon cyan near cursor
          }
          
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = color.replace('ALPHA', alpha.toString());
          this.ctx.lineWidth = distToMouse < hoverThreshold ? 1.0 : 0.6;
          this.ctx.stroke();
        }
      }
    }
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Default active coordinates (centered if mouse hasn't moved yet)
    const activeX = this.hasMouseMoved ? this.mouse.x : canvas.width / 2;
    const activeY = this.hasMouseMoved ? this.mouse.y : canvas.height / 2;

    // 1. Draw dark background color
    this.ctx.fillStyle = '#020205';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw historical spotlight trails
    if (this.hasMouseMoved) {
      for (let i = 0; i < this.mouseHistory.length; i++) {
        const pt = this.mouseHistory[i];
        const alpha = (i / this.mouseHistory.length) * 0.04;
        const radius = (i / this.mouseHistory.length) * 160 + 80;
        
        const trailGradient = this.ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius);
        trailGradient.addColorStop(0, `rgba(0, 242, 254, ${alpha})`);
        trailGradient.addColorStop(0.5, `rgba(177, 0, 255, ${alpha * 0.5})`);
        trailGradient.addColorStop(1, 'rgba(2, 2, 5, 0)');
        
        this.ctx.fillStyle = trailGradient;
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    // 3. Draw main cursor-following spotlight
    const spotlightRadius = 450;
    const spotlight = this.ctx.createRadialGradient(activeX, activeY, 0, activeX, activeY, spotlightRadius);
    spotlight.addColorStop(0, 'rgba(0, 242, 254, 0.12)');      // Neon cyan core
    spotlight.addColorStop(0.35, 'rgba(177, 0, 255, 0.05)');   // Neon purple aura
    spotlight.addColorStop(1, 'rgba(2, 2, 5, 0)');              // Fades completely into dark backdrop
    
    this.ctx.fillStyle = spotlight;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Update and draw click ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const rp = this.ripples[i];
      rp.radius += 5.5;
      rp.opacity -= 0.012;
      
      if (rp.opacity <= 0) {
        this.ripples.splice(i, 1);
        continue;
      }
      
      // Outer expanding ring (Cyan)
      this.ctx.beginPath();
      this.ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0, 242, 254, ${rp.opacity})`;
      this.ctx.lineWidth = 2.0;
      this.ctx.stroke();

      // Inner expanding ring (Purple, slightly smaller)
      this.ctx.beginPath();
      this.ctx.arc(rp.x, rp.y, rp.radius * 0.75, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(177, 0, 255, ${rp.opacity * 0.6})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
    }

    // 5. Draw particles with proximity-based brightening and scaling
    this.particles.forEach(p => {
      const dist = Math.hypot(p.x - activeX, p.y - activeY);
      const hoverThreshold = 180;
      
      let opacityFactor = 1.0;
      let radiusFactor = 1.0;
      
      if (dist < hoverThreshold) {
        const factor = 1 - dist / hoverThreshold; // 0 to 1
        opacityFactor = 1.0 + factor * 1.6; // Up to 2.6x brighter
        radiusFactor = 1.0 + factor * 1.1;  // Up to 2.1x larger
      }
      
      p.update(canvas.width, canvas.height);
      p.draw(this.ctx, opacityFactor, radiusFactor);
    });

    // 6. Draw connection lines
    this.drawConnections(activeX, activeY);

    this.animationId = requestAnimationFrame(this.animate);
  };
}

class Particle implements ParticleState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity = 0.35;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.radius = Math.random() * 1.5 + 1.0;
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off viewport boundaries
    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, opacityFactor = 1.0, radiusFactor = 1.0) {
    const finalRadius = this.radius * radiusFactor;
    const finalOpacity = Math.min(0.9, this.baseOpacity * opacityFactor);
    
    // Draw two-layered circles for proximity glow (more performant than shadowBlur)
    if (radiusFactor > 1.1) {
      // Glow aura
      ctx.beginPath();
      ctx.arc(this.x, this.y, finalRadius * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${finalOpacity * 0.35})`;
      ctx.fill();
    }
    
    // Core Particle
    ctx.beginPath();
    ctx.arc(this.x, this.y, finalRadius, 0, Math.PI * 2);
    ctx.fillStyle = radiusFactor > 1.1 ? `rgba(0, 242, 254, ${finalOpacity})` : `rgba(0, 242, 254, ${finalOpacity})`;
    ctx.fill();
  }
}
