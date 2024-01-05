import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AMDB_ENV } from '../env.token';

export type SuccessTokenResponse = {
  status_message: string;
  success: boolean;
  status_code: number;
};

export type RequestTokenResponse = SuccessTokenResponse & {
  request_token: string;
};

export type AccessTokenResponse = SuccessTokenResponse & {
  access_token: string;
  account_id: string;
};

@Injectable({ providedIn: 'root' })
export class TMDBAuthV4Service {
  readonly #env = inject(AMDB_ENV);
  readonly #http = inject(HttpClient);

  get baseUrl(): string {
    return `${this.#env.tmdbConfig.apiBaseUrlV4}/auth`;
  }

  get requestTokenUrl(): string {
    return `${this.baseUrl}/request_token`;
  }

  get accessTokenUrl(): string {
    return `${this.baseUrl}/access_token`;
  }

  createRequestToken(redirect_to: string): Observable<RequestTokenResponse> {
    return this.#http.post<never>(this.requestTokenUrl, { redirect_to });
  }

  createAccessToken(requestToken: string): Observable<AccessTokenResponse> {
    return this.#http.post<never>(this.accessTokenUrl, {
      request_token: requestToken,
    });
  }

  deleteAccessToken(access_token: string): Observable<SuccessTokenResponse> {
    return this.#http.delete<never>(this.accessTokenUrl, {
      body: { access_token },
    });
  }
}
