import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { UiRippleDirective } from '../+ui/ripple/ripple.directive';
import { fallbackRouteToDefault } from '../+utils/router';
import { ThemeService } from '../theme/theme.service';

@Component({
  standalone: true,
  selector: 'app-shell',
  styleUrl: 'app-shell.cmp.scss',
  templateUrl: 'app-shell.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FastSvgComponent, UiRippleDirective],
  host: { class: 'block' },
})
export class AppShellCmp {
  readonly #router = inject(Router);
  readonly #document = inject(DOCUMENT);
  readonly themeService = inject(ThemeService);
  readonly sideDrawerOpen = signal(false);

  readonly closeSidenav = (): void => {
    this.sideDrawerOpen.set(false);
  };

  constructor() {
    this.#router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => (e as NavigationEnd).urlAfterRedirects),
        distinctUntilChanged(),
        tap(() => this.closeSidenav()),
        takeUntilDestroyed(),
      )
      .subscribe();

    /**
     * **🚀 Perf Tip for TBT:**
     *
     * Disable initial sync navigation in router config and schedule it in router-outlet container component.
     * We use a scheduling API (setTimeout) to run it in a separate task from the bootstrap phase
     */
    setTimeout(() => {
      this.#router.navigate([
        // The pathname route seems to work correctly on SSR but when pre-rendering it is an empty string.
        // We have to fall back to document URL as a fix.
        fallbackRouteToDefault(
          this.#document.location.pathname || this.#document.URL,
        ),
      ]);
    });
  }
}
