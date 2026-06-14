import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, signal, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  standalone: true
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  readonly projects = this.portfolioService.projects;
  readonly isRevealed = signal(false);
  
  private observer?: IntersectionObserver;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.isRevealed.set(true);
        this.observer?.disconnect();
      }
    }, {
      threshold: 0.1
    });

    this.observer.observe(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  onMouseMove(e: MouseEvent, card: HTMLDivElement) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
}
