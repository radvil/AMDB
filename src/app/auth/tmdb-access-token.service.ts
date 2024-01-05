import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AMDB_ENV } from '../env.token';

@Injectable({ providedIn: 'root' })
export class TMDBAccessTokenService {
  readonly #env = inject(AMDB_ENV);
  readonly #platformId = inject(PLATFORM_ID);
  #readAccessKey = this.#env.tmdbConfig.apiReadAccessToken;

  get storageKey(): string {
    return `${this.#env.id}-access-token`;
  }

  get accessToken(): string {
    return this.#readAccessKey;
  }

  setUserAccessToken(accessToken: string) {
    this.#readAccessKey = accessToken;
  }

  resetToReadAccessToken(): void {
    this.#readAccessKey = this.#env.tmdbConfig.apiReadAccessToken;
  }

  constructor() {
    if (isPlatformBrowser(this.#platformId)) {
      const accessToken = window.localStorage.getItem(this.storageKey);
      accessToken && this.setUserAccessToken(accessToken);
    }
  }
}
