import { Injectable, computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import {
  RespNowPlayingMovies,
  TmdbHttpApiService,
} from '../+api/http-api.service';
import { optimizedFetch } from '../+core/cdk/optimized-fetch';
import { WithContext } from '../+core/cdk/with-context.interface';
import { AppInitializer } from '../+models/initializer';
import { addImageTag } from '../+utils/add-image-tag';
import { W500H282 } from '../+constants/image-size';
import { MY_LIST_FALLBACK } from '../+constants/tmdb';

type State = {
  nowPlayingMovies: WithContext<Record<string, RespNowPlayingMovies>>;
};

const initialState: State = {
  nowPlayingMovies: {
    loading: false,
    value: {},
  },
};

@Injectable({ providedIn: 'root' })
export class MovieState implements AppInitializer {
  protected tmdbApi = inject(TmdbHttpApiService);
  readonly state = signalState(initialState);
  readonly nowPlayingMovies = (lang = this.defaultLang) =>
    computed(() => {
      const { value, loading } = this.state().nowPlayingMovies;
      // const movies = value[lang].results?.map((mv) =>
      //   addImageTag(mv, {
      //     fallback: MY_LIST_FALLBACK,
      //     pathProp: 'backdrop_path',
      //     dims: W500H282,
      //   }),
      // );
      return {
        values: value[lang]?.results || [],
        loading,
      };
    });

  get defaultLang(): string {
    return 'en-US';
  }

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

  /**
   * state actions trigger (initializer)
   * going to prefetch this data on APP_INIT for better result
   */
  initialize(lang: unknown = this.defaultLang): void {
    this.fetchNowPlayingMovies(lang as string);
  }
}
