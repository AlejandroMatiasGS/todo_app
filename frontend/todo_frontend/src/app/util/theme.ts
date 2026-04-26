import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';
  private platformId = inject(PLATFORM_ID);

  darkMode = signal(this.loadTheme());

  constructor() {
    this.applyTheme(this.darkMode());
  }

  private loadTheme(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.THEME_KEY);
      if (saved !== null) {
        return saved === 'dark';
      }
    }
    return false;
  }

  toggleTheme() {
    this.darkMode.set(!this.darkMode());
    this.applyTheme(this.darkMode());
  }

  private applyTheme(isDark: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(this.THEME_KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(this.THEME_KEY, 'light');
      }
    }
  }

  isDark() {
    return this.darkMode() == true;
  }
}