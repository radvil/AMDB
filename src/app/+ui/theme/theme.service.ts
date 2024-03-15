import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly LS_KEY = 'amdb-theme';

  // default tailwind implementation,
  // should set darkMode to "class" in tailwind.config.js
  readonly DARK_CLASSNAME = 'dark';

  #document = inject(DOCUMENT);
  #platformId = inject(PLATFORM_ID);
  #renderer = inject(RendererFactory2).createRenderer(null, null);

  get rootElement(): HTMLElement {
    return this.#document.body.parentElement as HTMLElement;
  }

  readonly theme = signal<'light' | 'dark'>('light');
  readonly isDarkMode = computed(() => this.theme() === 'dark');

  toggleTheme(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
  }

  syncTheme(): void {
    if (isPlatformBrowser(this.#platformId)) {
      const variant = localStorage.getItem(this.LS_KEY) as
        | 'light'
        | 'dark'
        | null;
      if (variant) {
        this.theme.set(variant);
      } else {
        const systemDark = window?.matchMedia('(prefers-color-scheme: dark)')
          .matches;
        this.theme.set(systemDark ? 'dark' : 'light');
      }
    }
  }

  constructor() {
    effect(() => {
      const theme = this.theme();
      const isDarkMode = theme === 'dark';
      const next = isDarkMode ? 'addClass' : 'removeClass';
      this.#renderer[next](this.rootElement, this.DARK_CLASSNAME);
      localStorage.setItem(this.LS_KEY, theme);
    });
  }
}
