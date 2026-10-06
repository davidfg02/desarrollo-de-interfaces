import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  dark = signal(false);

  constructor() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.set(saved ? saved === 'dark' : prefersDark);
  }

  toggle(): void {
    this.set(!this.dark());
  }

  private set(dark: boolean): void {
    this.dark.set(dark);
    document.documentElement.classList.toggle('ion-palette-dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
}