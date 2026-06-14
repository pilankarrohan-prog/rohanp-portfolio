import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, signal, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
  standalone: true
})
export class Resume implements OnInit, AfterViewInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  readonly isRevealed = signal(false);
  readonly showModal = signal(false);
  readonly resumeUrl = signal<SafeResourceUrl>('');
  
  private observer?: IntersectionObserver;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.resumeUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl('Rohan_Pilankar_Resume.pdf'));
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.isRevealed.set(true);
        this.observer?.disconnect();
      }
    }, {
      threshold: 0.15
    });

    this.observer.observe(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  openResumeModal() {
    this.showModal.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeResumeModal() {
    this.showModal.set(false);
    document.body.style.overflow = '';
  }

  onMouseMove(e: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
}
