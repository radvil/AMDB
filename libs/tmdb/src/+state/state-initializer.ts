import {
  APP_INITIALIZER,
  Type,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { AppInitializer } from '../+models/initializer';

export function provideAmdbStateInitializer(states: Type<AppInitializer>[]) {
  return makeEnvironmentProviders([
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory:
        (initializers = states.map((s) => inject(s))) =>
        (): void => {
          initializers.forEach((x) => x.initialize());
        },
    },
  ]);
}
