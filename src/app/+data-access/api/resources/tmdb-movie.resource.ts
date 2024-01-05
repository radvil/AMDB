import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { getTMDBMovieOptions } from '../../../+utils/tmdb.util';
import { AMDB_ENV } from '../../../env.token';
import { TMDBAppendOptions } from '../models/tmdb-append.model';
import { TMDBMovieCredits } from '../models/tmdb-credit.model';
import { TMDBMovie } from '../models/tmdb-movie.model';
import {
  TMDBPaginateOptions,
  TMDBPaginateResult,
} from '../models/tmdb-paginate.model';

@Injectable({ providedIn: 'root' })
export class TMDBMovieHttpResource {
  readonly #env = inject(AMDB_ENV);
  readonly #http = inject(HttpClient);
  readonly url = {
    base: () => `${this.#env.tmdbConfig.apiBaseUrlV3}/movie`,
    movie: (id: string) => `${this.url.base()}/${id}`,
    category: (category: string) => `${this.url.base()}/${category}`,
    credits: (id: string) => `${this.url.movie(id)}/credits`,
    related: (id: string) => `${this.url.movie(id)}/recommendations`,
    query: (keyword: string) => {
      return `${this.url.base()}/search/movie?query=${keyword}`;
    },
  } as const;

  getRelatedMovies(movieId: string, params?: TMDBPaginateOptions) {
    params = getTMDBMovieOptions(params);
    return this.#http.get<TMDBPaginateResult<TMDBMovie>>(
      this.url.related(movieId),
      {
        params,
      },
    );
  }

  getMovieCategory(movieCategory: string, params?: TMDBPaginateOptions) {
    params = getTMDBMovieOptions(params);
    return this.#http.get<TMDBPaginateResult<TMDBMovie>>(
      this.url.category(movieCategory),
      { params },
    );
  }

  getMovie(movieId: string, params?: TMDBAppendOptions) {
    return this.#http.get<TMDBMovie>(this.url.movie(movieId), { params });
  }

  getCredits(movieId: string) {
    return this.#http.get<TMDBMovieCredits>(this.url.credits(movieId));
  }

  queryMovie(keyword: string) {
    return this.#http
      .get<{ results: TMDBMovie[] }>(this.url.query(keyword))
      .pipe(map((res) => res.results));
  }
}
