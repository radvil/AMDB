import { IMAGE_CONFIG, IMAGE_LOADER } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import {
  MovieState,
  PeopleState,
  TvShowState,
  provideAmdbStateInitializer,
  provideTmdbEnvConfig,
  tmdbHttpContentTypeInterceptor,
  tmdbHttpReadAccessInterceptor,
} from '@libs/tmdb';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { provideClientTheme, provideIoScroll } from '@ui';
import { environment } from '../environments/environment';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIoScroll(),
    provideAnimationsAsync('animations'),
    provideRouter(
      APP_ROUTES,
      // withDebugTracing(),
      withComponentInputBinding(),
      withViewTransitions({ skipInitialTransition: true }),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
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
    provideClientTheme(),
    provideTmdbEnvConfig(environment.tmdbConfig),
    provideAmdbStateInitializer([MovieState, TvShowState, PeopleState]),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        tmdbHttpContentTypeInterceptor,
        tmdbHttpReadAccessInterceptor,
      ]),
    ),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
    // {
    //   provide: IMAGE_LOADER,
    //   useValue: {
    //     disableImageSizeWarning: true,
    //     disableImageLazyLoadWarning: true,
    //   },
    // },
    provideFastSVG({
      url: (name: string) => `assets/icons/svg/${name}.svg`,
      defaultSize: '18',
    }),
  ],
};
