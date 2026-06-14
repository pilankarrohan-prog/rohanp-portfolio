import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  standalone: true
})
export class Hero implements OnInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;
  readonly typingText = signal('');
  
  private wordIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timerId?: any;

  ngOnInit() {
    this.type();
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  private type = () => {
    const titles = this.profile().titles;
    const currentWord = titles[this.wordIndex];
    let delay = 100;

    if (this.isDeleting) {
      this.typingText.set(currentWord.substring(0, this.charIndex - 1));
      this.charIndex--;
      delay = 40;
    } else {
      this.typingText.set(currentWord.substring(0, this.charIndex + 1));
      this.charIndex++;
      delay = 100;
    }

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      delay = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % titles.length;
      delay = 500;
    }

    this.timerId = setTimeout(this.type, delay);
  };
}
