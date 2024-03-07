import {
  DOCUMENT,
  NgClass,
  NgTemplateOutlet,
  isPlatformBrowser,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { ThemeService, UiButton, UiRipple } from '@ui';
import { MenuItem, menuItems } from './menu-items';
import { SearchDialogCmp } from './search-dialog/search-dialog.cmp';
import { SidebarCmp } from './sidebar/sidebar.cmp';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-shell',
  styleUrl: 'app-shell.cmp.scss',
  templateUrl: 'app-shell.cmp.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'block min-h-[100svh]',
    '[attr.data-scroll]': 'scrollData()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    FastSvgComponent,
    UiRipple,
    UiButton,
    NgTemplateOutlet,
    RouterLinkWithHref,
    RouterLinkActive,
    SidebarCmp,
    SearchDialogCmp,
  ],
})
export class AppShellCmp {
  #doc = inject(DOCUMENT);
  #platformId = inject(PLATFORM_ID);
  #destroyRef = inject(DestroyRef);
  readonly themeService = inject(ThemeService);
  readonly menuItems = signal<MenuItem[]>(menuItems);
  readonly year = new Date().getFullYear();
  searchOpened = false;
  sidebarOpened = false;

  readonly scrollData = signal<'' | 'up' | 'down'>('');

  get isStuckedTop(): boolean {
    return !(
      this.#doc.body.scrollTop > 20 || this.#doc.documentElement.scrollTop > 20
    );
  }

  scrollToTop(): void {
    this.#doc.body.scrollIntoView({ behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.#platformId)) {
      let lastScrollY = 0;
      fromEvent(this.#doc, 'scroll')
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          takeUntilDestroyed(this.#destroyRef),
        )
        .subscribe(() => {
          if (this.isStuckedTop) {
            this.scrollData.set('');
          } else {
            const scrollData = this.scrollData();
            if (window.scrollY > lastScrollY && scrollData !== 'down') {
              this.scrollData.set('down');
            } else if (window.scrollY < lastScrollY && scrollData === 'down') {
              this.scrollData.set('up');
            }
            lastScrollY = window.scrollY;
          }
        });
    }
  }
}
