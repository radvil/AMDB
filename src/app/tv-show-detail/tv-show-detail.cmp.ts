import { DatePipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  TMDB_ENV_CONFIG,
  Tmdb,
  TmdbHttpApiService,
  WithContext,
  optimizedFetch,
} from '@libs/tmdb';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { pipe, tap } from 'rxjs';
import { MarkdownPipe, YouTubeThumbPipe } from '../+cdk';
import { UiSliderModule } from '../+ui/feature-slider/feature-slider.cmp';
import { UiIoChildDirective } from '../+ui/io-scroll/io-child.directive';
import { ScreenService } from '../+ui/layout/screen.service';
import { UiRippleDirective } from '../+ui/ripple/ripple.directive';
import { TvShowTrailersCmp } from './trailer-slider/trailer-slider.cmp';

interface State {
  details: WithContext<Record<string, Tmdb.TvSeriesDetails>>;
  keywords: WithContext<Record<string, Tmdb.TvSeriesKeyword[]>>;
  reviews: WithContext<Record<string, Tmdb.Review[]>>;
  externalIds: WithContext<Record<string, Tmdb.ExternalIds | null>>;
  credits: WithContext<
    Record<string, Tmdb.TmdbRespBody.GetMovieCredits | null>
  >;
}

const initialState: State = {
  credits: {
    loading: false,
    value: {},
  },
  externalIds: {
    loading: false,
    value: {},
  },
  keywords: {
    loading: false,
    value: {},
  },
  reviews: {
    loading: false,
    value: {},
  },
  details: {
    loading: false,
    value: {},
  },
};

@Component({
  standalone: true,
  selector: 'app-tv-show-detail',
  templateUrl: 'tv-show-detail.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
  imports: [
    JsonPipe,
    DatePipe,
    MarkdownPipe,
    YouTubeThumbPipe,
    UiRippleDirective,
    FastSvgComponent,
    UiSliderModule,
    UiIoChildDirective,
    TvShowTrailersCmp,
  ],
})
export class TvShowDetailCmp {
  #title = inject(Title);
  #date = inject(DatePipe);
  protected locale = inject(LOCALE_ID);
  protected config = inject(TMDB_ENV_CONFIG);
  protected api = inject(TmdbHttpApiService);
  protected screen = inject(ScreenService);
  readonly id = input.required<number>({ alias: 'seriesId' });
  readonly requestKey = computed(() => this.getRequestKey(this.id()));
  readonly state = signalState(initialState);
  readonly details = computed(() => {
    const stateSlice = this.state().details;
    return {
      ...stateSlice,
      value: stateSlice.value[this.requestKey()],
    };
  });
  readonly credits = computed(() => {
    const stateSlice = this.state().credits;
    return {
      ...stateSlice,
      value: stateSlice.value[this.requestKey()],
    };
  });
  readonly reviews = computed(() => {
    const stateSlice = this.state().reviews;
    return {
      ...stateSlice,
      value: stateSlice.value[this.requestKey()],
    };
  });
  readonly lastReview = computed(() => {
    const reviews = this.reviews().value;
    return reviews?.length ? reviews[reviews.length - 1] : undefined;
  });
  readonly keywords = computed(() => {
    const stateSlice = this.state().keywords;
    return {
      ...stateSlice,
      value: stateSlice.value[this.requestKey()],
    };
  });
  readonly externalIds = computed(() => {
    const stateSlice = this.state().externalIds;
    return {
      ...stateSlice,
      value: stateSlice.value[this.requestKey()],
    };
  });
  readonly backdropPath = computed(() => {
    return `${this.config.imageBaseUrl}1920_and_h800_multi_faces${this.details().value.backdrop_path}`;
  });

  readonly reviewClamped = signal(true);

  get baseMediaUrl() {
    return 'https://media.themoviedb.org/t/p/w';
  }

  readonly getRequestKey = (id: number) => {
    return `${id}-${this.locale}`;
  };

  readonly fetchDetails = rxMethod<number>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            details: {
              ...s.details,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (seriesId) => this.getRequestKey(seriesId),
        (id) => {
          return this.api.getTvSeriesDetails(id, this.locale).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  details: {
                    ...s.details,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  details: {
                    ...s.details,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                const value = { [this.getRequestKey(id)]: resp };
                patchState(this.state, (s) => {
                  s.details = {
                    ...s.details,
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

  readonly fetchCredits = rxMethod<number>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            credits: {
              ...s.credits,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (seriesId) => this.getRequestKey(seriesId),
        (id) => {
          return this.api.getTvSeriesCredits(id, this.locale).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  credits: {
                    ...s.credits,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  credits: {
                    ...s.credits,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                const value = { [this.getRequestKey(id)]: resp };
                patchState(this.state, (s) => {
                  s.credits = {
                    ...s.credits,
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

  readonly fetchReviews = rxMethod<number>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            reviews: {
              ...s.reviews,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (id) => this.getRequestKey(id),
        (id) => {
          return this.api.getTvSeriesReviews(id, this.locale).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  credits: {
                    ...s.credits,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  credits: {
                    ...s.credits,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                const value = { [this.getRequestKey(id)]: resp.results };
                patchState(this.state, (s) => {
                  s.reviews = {
                    ...s.reviews,
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

  readonly fetchKeywords = rxMethod<number>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            keywords: {
              ...s.keywords,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (id) => this.getRequestKey(id),
        (id) => {
          return this.api.getTvSeriesKeywords(id).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  keywords: {
                    ...s.keywords,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  keywords: {
                    ...s.keywords,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                patchState(this.state, (s) => {
                  const value = {
                    [this.getRequestKey(id)]: resp.results || [],
                  };
                  s.keywords = {
                    ...s.keywords,
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

  readonly fetchExternalIds = rxMethod<number>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => ({
          externalIds: {
            ...s.externalIds,
            loading: true,
          },
        })),
      ),
      optimizedFetch(
        (id) => this.getRequestKey(id),
        (id) => {
          return this.api.getTvSeriesExternalIds(id).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  externalIds: {
                    ...s.externalIds,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  externalIds: {
                    ...s.externalIds,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                patchState(this.state, (s) => {
                  const value = { [this.getRequestKey(id)]: resp };
                  s.externalIds = {
                    ...s.externalIds,
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

  protected setTitle = effect(() => {
    const details = this.details().value;
    if (details?.name) {
      this.#title.setTitle(
        `${details?.name} | TV Series - ${this.#date.transform(details.last_air_date, 'YYYY')} | AMDB`,
      );
    }
  });

  ngOnInit(): void {
    const id = this.id();
    this.fetchDetails(id);
    this.fetchCredits(id);
    this.fetchReviews(id);
    this.fetchKeywords(id);
    this.fetchExternalIds(id);
  }
}
