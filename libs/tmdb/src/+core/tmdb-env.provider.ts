import { InjectionToken, type Provider } from '@angular/core';

export interface TmdbEnvConfig {
  apiKey: string;
  apiBaseUrlV3: string;
  apiBaseUrlV4: string;
  apiReadAccessToken: string;
  imageBaseUrl: string;
}

export const TMDB_ENV_CONFIG = new InjectionToken<TmdbEnvConfig>('TMDB_CONFIG');

export const provideTmdbEnvConfig = (value: TmdbEnvConfig): Provider => ({
  provide: TMDB_ENV_CONFIG,
  useValue: value,
});
