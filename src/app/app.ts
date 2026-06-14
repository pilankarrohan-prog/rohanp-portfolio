import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Particles } from './components/particles/particles';
import { Cursor } from './components/cursor/cursor.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Particles, Cursor],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected readonly title = signal('portfolio-app');
}
