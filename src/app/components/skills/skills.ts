import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, signal, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  standalone: true
})
export class Skills implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  readonly skillCategories = this.portfolioService.skills;
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
      threshold: 0.15
    });

    this.observer.observe(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
