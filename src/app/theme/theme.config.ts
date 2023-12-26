import {
  APP_INITIALIZER,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { ThemeService } from './theme.service';

export function provideClientTheme() {
  return makeEnvironmentProviders([
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: (themeApi = inject(ThemeService)) => {
        return () => {
          themeApi.syncTheme();
        };
      },
    },
  ]);
}
