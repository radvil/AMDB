import { IMAGE_LOADER } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import {
  MovieState,
  TvShowState,
  PeopleState,
  provideAmdbStateInitializer,
  provideTmdbEnvConfig,
  tmdbHttpContentTypeInterceptor,
  tmdbHttpReadAccessInterceptor,
} from '@libs/tmdb';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { environment } from '../environments/environment';
import { provideIoScroll } from './+ui/io-scroll/io-scroll.config';
import { APP_ROUTES } from './app.routes';
import { provideClientTheme } from './theme/theme.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withViewTransitions(),
      withComponentInputBinding(),
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
      provide: IMAGE_LOADER,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
    provideFastSVG({
      url: (name: string) => `assets/icons/svg/${name}.svg`,
      defaultSize: '18',
    }),
    provideIoScroll(),
  ],
};
