import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  MovieState,
  provideTmdbCore,
  tmdbHttpContentTypeInterceptor,
  tmdbHttpReadAccessInterceptor,
} from '@libs/tmdb';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { provideAmdbStateInitializer } from '../../libs/tmdb/src/+state/state-initializer';
import { environment } from '../environments/environment';
import { mergeBaseConfig } from './app.base.config';
import { provideClientTheme } from './theme/theme.config';

const browserConfig: ApplicationConfig = {
  providers: [
    provideClientTheme(),
    provideTmdbCore(environment.tmdbConfig),
    provideAmdbStateInitializer([MovieState]),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        tmdbHttpContentTypeInterceptor,
        tmdbHttpReadAccessInterceptor,
      ]),
    ),
    provideFastSVG({
      url: (name: string) => `assets/icons/svg/${name}.svg`,
      defaultSize: '18',
    }),
  ],
};

// We provide the config function as closure to be able to inject configuration from the consuming end
export const appConfig = () => mergeBaseConfig(browserConfig);
