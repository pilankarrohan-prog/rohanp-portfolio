import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, signal, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss',
  standalone: true
})
export class Achievements implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  readonly milestones = this.portfolioService.milestones;
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
}
