import { Injectable, LOCALE_ID, computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import { TmdbHttpApiService } from '../+api/http-api.service';
import { optimizedFetch } from '../+core/cdk/optimized-fetch';
import type { WithContext } from '../+core/cdk/with-context.interface';
import type { AppInitializer } from '../+models/initializer';
import type { TmdbRespBody } from '../+models/response-body';

interface TvShowStateModel {
  airingToday: WithContext<Record<string, TmdbRespBody.GetTvShowList>>;
}

const initialState: TvShowStateModel = {
  airingToday: {
    loading: false,
    value: {},
  },
};

@Injectable({ providedIn: 'root' })
export class TvShowState implements AppInitializer {
  protected locale = inject(LOCALE_ID);
  protected tmdbApi = inject(TmdbHttpApiService);
  readonly state = signalState(initialState);

  readonly airingToday = (lang = this.locale) =>
    computed(() => {
      const { value, loading } = this.state().airingToday;
      return {
        values: value[lang]?.results || [],
        loading,
      };
    });

  readonly fetchAiringTodayTvShows = rxMethod<string>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            airingToday: {
              ...s.airingToday,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (requestKey) => requestKey,
        (language) => {
          return this.tmdbApi.getAiringTvShows({ language, page: 1 }).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  airingToday: {
                    ...s.airingToday,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  airingToday: {
                    ...s.airingToday,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                const value = { [language]: resp };
                patchState(this.state, (s) => {
                  s.airingToday = {
                    ...s.airingToday,
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
  initialize(lang: unknown = this.locale): void {
    this.fetchAiringTodayTvShows(lang as string);
  }
}
