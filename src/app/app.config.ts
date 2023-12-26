import { ApplicationConfig } from '@angular/core';
import { environment } from '../environments/environment';
import { provideCoreConfig } from './core/core.config';
import { provideClientTheme } from './theme/theme.config';

export const appConfig: ApplicationConfig = {
  providers: [provideCoreConfig(environment), provideClientTheme()],
};
