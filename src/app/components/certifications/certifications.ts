import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.html',
  styleUrl: './certifications.scss',
  imports: [CommonModule],
  standalone: true
})
export class Certifications implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  readonly certifications = this.portfolioService.certifications;
  
  readonly selectedCategory = signal<string>('All');
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
      threshold: 0.05
    });

    this.observer.observe(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  getCategories(): string[] {
    const list = this.certifications().map(c => c.category);
    return ['All', ...Array.from(new Set(list))];
  }

  filteredCertifications() {
    const cat = this.selectedCategory();
    if (cat === 'All') {
      return this.certifications();
    }
    return this.certifications().filter(c => c.category === cat);
  }

  selectCategory(cat: string) {
    this.selectedCategory.set(cat);
  }
}
