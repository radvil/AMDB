import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { IMAGE_LOADER } from '@angular/common';

const baseConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withViewTransitions(),
      // withDebugTracing(),
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
    {
      provide: IMAGE_LOADER,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
  ],
};

export function mergeBaseConfig(...configs: ApplicationConfig[]) {
  return mergeApplicationConfig(baseConfig, ...configs);
}
