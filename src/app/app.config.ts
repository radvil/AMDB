import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { environment } from '../environments/environment';
import { provideTmdbImageLoader } from './+data-access/images/image-loader.provider';
import { mergeBaseConfig } from './app.base.config';
import { provideClientEnv } from './env.token';
import { provideClientTheme } from './theme/theme.config';

const browserConfig: ApplicationConfig = {
  providers: [
    provideClientEnv(environment),
    provideHttpClient(withFetch()),
    provideTmdbImageLoader(),
    // TODO:
    // import { provideFastSVG } from '@push-based/ngx-fast-svg';
    // provideFastSVG({
    //   url: (name: string) => `assets/svg-icons/${name}.svg`,
    // }),
    provideClientTheme(),
  ],
};

// We provide the config function as closure to be able to inject configuration from the consuming end
export const appConfig = () => mergeBaseConfig(browserConfig);
