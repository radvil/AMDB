import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TMDB_ENV_CONFIG } from '../+core/tmdb-env.provider';

@Injectable({ providedIn: 'root' })
export class TmdbAccessTokenService {
  readonly #config = inject(TMDB_ENV_CONFIG);
  readonly #platformId = inject(PLATFORM_ID);
  #readAccessKey = this.#config.apiReadAccessToken;

  // TODO: research about default accessToken key on TMDB API
  get storageKey(): string {
    return 'access-token';
  }

  get accessToken(): string {
    return this.#readAccessKey;
  }

  setUserAccessToken(accessToken: string) {
    this.#readAccessKey = accessToken;
  }

  resetToReadAccessToken(): void {
    this.#readAccessKey = this.#config.apiReadAccessToken;
  }

  constructor() {
    if (isPlatformBrowser(this.#platformId)) {
      const accessToken = window.localStorage.getItem(this.storageKey);
      accessToken && this.setUserAccessToken(accessToken);
    }
  }
}
