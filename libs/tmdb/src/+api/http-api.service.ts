import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '../+models';
import { TMDB_ENV_CONFIG } from '../+core/tmdb-env.provider';
import { RequestParams } from '../+models/request-params';

export interface RespNowPlayingMovies {
  page: 1;
  results: Movie[];
  dates: {
    maximum: '2023-05-03';
    minimum: '2023-03-16';
  };
}

@Injectable({ providedIn: 'root' })
export class TmdbHttpApiService {
  readonly #config = inject(TMDB_ENV_CONFIG);
  readonly #http = inject(HttpClient);
  readonly url = {
    movie: () => `${this.#config.apiBaseUrlV3}/movie`,
    nowPlaying: () => `${this.url.movie()}/now_playing`,
  } as const;

  /**
   * @see https://developer.themoviedb.org/reference/movie-now-playing-list
   * @param params TMDB `get-movie-now-playing-list`
   */
  getNowPlayingMovies(params?: RequestParams.GetMovieNowPlayingList) {
    return this.#http.get<RespNowPlayingMovies>(this.url.nowPlaying(), {
      params,
    });
  }
}
