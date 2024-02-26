import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { TmdbEnvConfig, provideTmdbEnvConfig } from './tmdb-env.provider';
import { provideTmdbImageLoader } from './image-loader.provider';

export function provideTmdbCore(config: TmdbEnvConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    // provideTmdbImageLoader(config.imageBaseUrl),
    provideTmdbEnvConfig(config),
  ]);
}
