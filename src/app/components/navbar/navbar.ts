import { Component, signal, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar {
  readonly isOpen = signal(false);
  readonly isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isOpen.update(val => !val);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}
