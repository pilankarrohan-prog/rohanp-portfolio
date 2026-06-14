import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  standalone: true
})
export class About {
  private portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;
}
