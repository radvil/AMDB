import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withDisabledInitialNavigation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { APP_ROUTES } from './app.routes';

const baseConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withViewTransitions(),
      // withDebugTracing(),
      /**
       * **🚀 Perf Tip for TBT:**
       *
       * Disable initial sync navigation in router config and schedule it in router-outlet container component
       */
      withDisabledInitialNavigation(),
      withInMemoryScrolling({
        /**
         * **💡 UX Tip for InfiniteScroll:**
         *
         * Reset scroll position to top on route change, users could be
         * irritated starting a new list from the bottom of the page.
         *
         * also: otherwise infinite scroll isn't working properly
         */
        scrollPositionRestoration: 'top',
      }),
    ),
    // TODO: provideAppStateInitializer()
  ],
};

export function mergeBaseConfig(...configs: ApplicationConfig[]) {
  return mergeApplicationConfig(baseConfig, ...configs);
}
