import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TMDB_ENV_CONFIG } from '../+core/tmdb-env.provider';
import { AuthV3GuestSession } from '../+models';
import { staticRequest } from '../+utils/http';

@Injectable({ providedIn: 'root' })
export class TMDBAuthV3Service {
  readonly #http = inject(HttpClient);
  readonly #env = inject(TMDB_ENV_CONFIG);

  get baseUrl(): string {
    return `${this.#env.apiBaseUrlV3}/authentication`;
  }

  get newGuestSessionUrl(): string {
    return `${this.baseUrl}/guest_session/new`;
  }

  getGuestSession = () => {
    return this.#http.get<AuthV3GuestSession>(this.newGuestSessionUrl);
  };

  getGuestSessionCached = staticRequest(this.getGuestSession);
}
