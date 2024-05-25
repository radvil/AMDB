import { Injectable, computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import { TmdbHttpApiService } from '../+api/http-api.service';
import { optimizedFetch } from '../+core/cdk/optimized-fetch';
import type { WithContext } from '../+core/cdk/with-context.interface';
import type { AppInitializer } from '../+models/initializer';
import type { TmdbRespBody } from '../+models/response-body';

interface MovieStateModel {
  popular: WithContext<Record<string, TmdbRespBody.GetMovieList>>;
  topRated: WithContext<Record<string, TmdbRespBody.GetMovieList>>;
  nowPlayingMovies: WithContext<Record<string, TmdbRespBody.GetMovieList>>;
}

const initialState: MovieStateModel = {
  popular: {
    loading: false,
    value: {},
  },
  topRated: {
    loading: false,
    value: {},
  },
  nowPlayingMovies: {
    loading: false,
    value: {},
  },
};

@Injectable({ providedIn: 'root' })
export class MovieState implements AppInitializer {
  protected tmdbApi = inject(TmdbHttpApiService);
  readonly state = signalState(initialState);

  get defaultLang(): string {
    return 'en-US';
  }

  readonly topRated = (lang = this.defaultLang) =>
    computed(() => {
      const { value, loading } = this.state().topRated;
      return {
        values: value[lang]?.results || [],
        loading,
      };
    });

  readonly popular = (lang = this.defaultLang) =>
    computed(() => {
      const { value, loading } = this.state().popular;
      return {
        values: value[lang]?.results || [],
        loading,
      };
    });

  readonly nowPlayingMovies = (lang = this.defaultLang) =>
    computed(() => {
      const { value, loading } = this.state().nowPlayingMovies;
      return {
        values: value[lang]?.results || [],
        loading,
      };
    });

  readonly fetchPopularMovies = rxMethod<string>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            popular: {
              ...s.popular,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (requestKey) => requestKey,
        (language) => {
          return this.tmdbApi.getPopularMovies({ language, page: 1 }).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  popular: {
                    ...s.popular,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  popular: {
                    ...s.popular,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                const value = { [language]: resp };
                patchState(this.state, (s) => {
                  s.popular = {
                    ...s.popular,
                    value,
                  };
                  return s;
                });
              },
            }),
          );
        },
      ),
    ),
  );

  readonly fetchNowPlayingMovies = rxMethod<string>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            nowPlayingMovies: {
              ...s.nowPlayingMovies,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (requestKey) => requestKey,
        (language) => {
          return this.tmdbApi.getNowPlayingMovies({ language, page: 1 }).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  nowPlayingMovies: {
                    ...s.nowPlayingMovies,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  nowPlayingMovies: {
                    ...s.nowPlayingMovies,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                const value = { [language]: resp };
                patchState(this.state, (s) => {
                  s.nowPlayingMovies = {
                    ...s.nowPlayingMovies,
                    value,
                  };
                  return s;
                });
              },
            }),
          );
        },
      ),
    ),
  );

  readonly fetchTopRatedMovies = rxMethod<string>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            topRated: {
              ...s.topRated,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (requestKey) => requestKey,
        (language) => {
          return this.tmdbApi.getTopRatedMovies({ language, page: 1 }).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  topRated: {
                    ...s.topRated,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  topRated: {
                    ...s.topRated,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                const value = { [language]: resp };
                patchState(this.state, (s) => {
                  s.topRated = {
                    ...s.topRated,
                    value,
                  };
                  return s;
                });
              },
            }),
          );
        },
      ),
    ),
  );

  /**
   * state actions trigger (initializer)
   * going to prefetch this data on APP_INIT for better result
   */
  initialize(lang: unknown = this.defaultLang): void {
    this.fetchPopularMovies(lang as string);
    this.fetchTopRatedMovies(lang as string);
    this.fetchNowPlayingMovies(lang as string);
  }
}
