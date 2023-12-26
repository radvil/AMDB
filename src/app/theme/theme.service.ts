import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  effect,
  inject,
  signal,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly LS_KEY = 'amdb-theme';
  #platformId = inject(PLATFORM_ID);
  #renderer = inject(RendererFactory2).createRenderer(null, null);
  #document = inject(DOCUMENT);

  readonly theme = signal<'light' | 'dark'>('light');

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
      const variant = this.theme();
      if (variant === 'dark') {
        this.#renderer.setAttribute(
          this.#document.body.parentElement,
          'data-theme',
          'dark',
        );
      } else {
        this.#renderer.removeAttribute(
          this.#document.body.parentElement,
          'data-theme',
        );
      }
    });
  }
}
