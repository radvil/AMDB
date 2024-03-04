import { Injectable, LOCALE_ID, computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import { TmdbHttpApiService } from '../+api/http-api.service';
import { optimizedFetch } from '../+core/cdk/optimized-fetch';
import { WithContext } from '../+core/cdk/with-context.interface';
import { AppInitializer } from '../+models/initializer';
import { TmdbRespBody } from '../+models/response-body';

interface PeopleStateModel {
  trendingPeople: WithContext<Record<string, TmdbRespBody.GetPeopleList>>;
}

const initialState: PeopleStateModel = {
  trendingPeople: {
    loading: false,
    value: {},
  },
};

@Injectable({ providedIn: 'root' })
export class PeopleState implements AppInitializer {
  protected tmdbApi = inject(TmdbHttpApiService);
  readonly state = signalState(initialState);

  readonly localeId = inject(LOCALE_ID);

  readonly trendingPeople = (lang = this.localeId) =>
    computed(() => {
      const { value, loading } = this.state().trendingPeople;
      return {
        values: value[lang]?.results || [],
        loading,
      };
    });

  readonly fetchTrendingPeople = rxMethod<string>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            trendingPeople: {
              ...s.trendingPeople,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (requestKey) => requestKey,
        (language) => {
          return this.tmdbApi.getTrendingPeople(language).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  trendingPeople: {
                    ...s.trendingPeople,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  trendingPeople: {
                    ...s.trendingPeople,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                const value = { [language]: resp };
                patchState(this.state, (s) => {
                  s.trendingPeople = {
                    ...s.trendingPeople,
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
  initialize(lang: unknown = this.localeId): void {
    this.fetchTrendingPeople(lang as string);
  }
}
