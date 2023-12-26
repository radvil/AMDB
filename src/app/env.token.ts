import { InjectionToken, Provider } from '@angular/core';

export interface AmdbEnv {
  id: string;
  name: string;
  production: boolean;
}

export const AMDB_ENV = new InjectionToken<AmdbEnv>('AMDB_ENV');

export const provideClientEnv = (value: AmdbEnv): Provider => ({
  provide: AMDB_ENV,
  useValue: value,
});
