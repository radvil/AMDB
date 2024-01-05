import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { environment } from '../environments/environment';
import { tmdbHttpContentTypeInterceptor } from './+data-access/api/tmdb-http-content-type.interceptor';
import { provideTmdbImageLoader } from './+data-access/images/image-loader.provider';
import { provideSwiperElement } from './+ui/swiper/swiper.provider';
import { mergeBaseConfig } from './app.base.config';
import { tmdbHttpReadAccessInterceptor } from './auth/tmdb-http-read-access.interceptor';
import { provideClientEnv } from './env.token';
import { provideClientTheme } from './theme/theme.config';

const browserConfig: ApplicationConfig = {
  providers: [
    provideClientEnv(environment),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        tmdbHttpContentTypeInterceptor,
        tmdbHttpReadAccessInterceptor,
      ]),
    ),
    provideTmdbImageLoader(),
    provideFastSVG({ url: (name: string) => `assets/icons/svg/${name}.svg` }),
    provideSwiperElement(),
    /**
     * **🚀 Perf Tip for TBT:**
     *
     * Chunk app bootstrap over APP_INITIALIZER.
     */
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: () => (): Promise<void> =>
        new Promise<void>((resolve) => {
          setTimeout(() => resolve());
        }),
      deps: [],
    },
    provideClientTheme(),
  ],
};

// We provide the config function as closure to be able to inject configuration from the consuming end
export const appConfig = () => mergeBaseConfig(browserConfig);
