import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  imports: [ReactiveFormsModule],
  standalone: true
})
export class Contact implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;
  readonly isRevealed = signal(false);
  readonly showModal = signal(false);
  readonly copied = signal(false);

  triggerMail(event: MouseEvent) {
    window.location.href = 'mailto:' + this.profile().email;
  }

  copyEmail(event: MouseEvent) {
    event.stopPropagation();
    navigator.clipboard.writeText(this.profile().email).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

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

  onSubmit() {
    if (this.contactForm.valid) {
      this.showModal.set(true);
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.showModal.set(false);
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
