import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { staticRequest } from '../+utils/http';
import { AMDB_ENV } from '../env.token';
import { TMDBAuthV3GuestSession } from './tmdb-auth.model';

@Injectable({ providedIn: 'root' })
export class TMDBAuthV3Service {
  readonly #http = inject(HttpClient);
  readonly #env = inject(AMDB_ENV);

  get baseUrl(): string {
    return `${this.#env.tmdbConfig.apiBaseUrlV3}/authentication`;
  }

  get newGuestSessionUrl(): string {
    return `${this.baseUrl}/guest_session/new`;
  }

  getGuestSession = () => {
    return this.#http.get<TMDBAuthV3GuestSession>(this.newGuestSessionUrl);
  };

  getGuestSessionCached = staticRequest(this.getGuestSession);
}
