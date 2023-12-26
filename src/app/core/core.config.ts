import { provideHttpClient, withFetch } from '@angular/common/http';
import { InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface CoreConfig {
  id: string;
  name: string;
  production: boolean;
}

export const CORE_CONFIG = new InjectionToken<CoreConfig>('CORE_CONFIG');

export function provideCoreConfig(config: CoreConfig) {
  return makeEnvironmentProviders([
    { provide: CORE_CONFIG, useValue: config },
    provideHttpClient(withFetch()),
  ]);
}
