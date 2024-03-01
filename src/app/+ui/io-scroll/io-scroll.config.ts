import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { IoScrollService } from './io-scroll.service';

export function provideIoScroll(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: (scrollService = inject(IoScrollService)) => {
        return () => {
          scrollService.init();
        };
      },
    },
  ]);
}
