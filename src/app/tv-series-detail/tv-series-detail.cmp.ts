import { DatePipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MarkdownPipe, YouTubeThumbPipe } from '@cdk';
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
import {
  ScreenService,
  UiIoChild,
  UiLatestReviewCard,
  UiPostersSlider,
  UiRipple,
  UiSliderContainer,
  UiSliderContent,
  UiTab,
  UiTabset,
  UiTrailersSlider,
  UiTvShowRecommendationsSliderCmp,
} from '@ui';
import { pipe, tap } from 'rxjs';

type SubState<T> = WithContext<Record<string, T>>;

interface State {
  details: SubState<Tmdb.TvSeriesDetails>;
  keywords: SubState<Tmdb.TvSeriesKeyword[]>;
  reviews: SubState<Tmdb.Review[]>;
  externalIds: SubState<Tmdb.ExternalIds | null>;
  videos: SubState<Tmdb.Video[]>;
  images: SubState<Tmdb.TmdbRespBody.GetImages | null>;
  credits: SubState<Tmdb.TmdbRespBody.GetMovieCredits | null>;
  recommendations: SubState<Tmdb.TmdbRespBody.GetTvShowRecommendations | null>;
}

type Data<K extends keyof State> =
  State[K] extends WithContext<Record<string, infer V>> ? V : never;

const initialState: State = {
  videos: {
    loading: false,
    value: {},
  },
  images: {
    loading: false,
    value: {},
  },
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
  recommendations: {
    loading: false,
    value: {},
  },
};

@Component({
  standalone: true,
  selector: 'app-tv-series-detail',
  templateUrl: 'tv-series-detail.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
  imports: [
    JsonPipe,
    DatePipe,
    MarkdownPipe,
    FastSvgComponent,
    YouTubeThumbPipe,
    UiTrailersSlider,
    UiRipple,
    UiPostersSlider,
    UiSliderContent,
    UiSliderContainer,
    UiIoChild,
    UiTabset,
    UiTab,
    UiLatestReviewCard,
    UiTvShowRecommendationsSliderCmp,
  ],
})
export class TvSeriesDetailCmp {
  #title = inject(Title);
  #date = inject(DatePipe);
  protected locale = inject(LOCALE_ID);
  protected config = inject(TMDB_ENV_CONFIG);
  protected api = inject(TmdbHttpApiService);
  protected screen = inject(ScreenService);

  readonly select = <K extends keyof State>(key: K) => {
    return () => {
      const { value, ...extracts } = this.state()[key];
      return {
        ...extracts,
        value: value[this.requestKey()] as Data<K>,
      };
    };
  };

  readonly state = signalState(initialState);
  readonly id = input.required<number>({ alias: 'tvSeriesId' });
  readonly requestKey = computed(() => this.getRequestKey(this.id()));
  readonly images = computed(this.select('images'));
  readonly videos = computed(this.select('videos'));
  readonly details = computed(this.select('details'));
  readonly reviews = computed(this.select('reviews'));
  readonly keywords = computed(this.select('keywords'));
  readonly externalIds = computed(this.select('externalIds'));
  readonly credits = computed(this.select('credits'));
  readonly recommendations = computed(this.select('recommendations'));
  readonly lastReview = computed(() => {
    const reviews = this.reviews().value;
    return reviews?.length ? reviews[reviews.length - 1] : undefined;
  });

  get castList() {
    return this.credits().value?.cast || [];
  }

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

  readonly fetchRecommendations = rxMethod<number>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          return {
            recommendations: {
              ...s.recommendations,
              loading: true,
            },
          };
        }),
      ),
      optimizedFetch(
        (seriesId) => this.getRequestKey(seriesId),
        (id) => {
          return this.api.getTvSeriesRecommendations(id, this.locale).pipe(
            tapResponse({
              error: (e: Error) =>
                patchState(this.state, (s) => ({
                  recommendations: {
                    ...s.recommendations,
                    error: e,
                  },
                })),
              finalize: () => {
                patchState(this.state, (s) => ({
                  recommendations: {
                    ...s.recommendations,
                    complete: true,
                    loading: false,
                  },
                }));
              },
              next: (resp) => {
                const value = { [this.getRequestKey(id)]: resp };
                patchState(this.state, (s) => {
                  s.recommendations = {
                    ...s.recommendations,
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

  readonly fetchVideos = rxMethod<number>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          s.videos.loading = true;
          return s;
        }),
      ),
      optimizedFetch(this.getRequestKey, (id) => {
        return this.api.getTvSeriesVideos(id, this.locale).pipe(
          tapResponse({
            error: (e: Error) =>
              patchState(this.state, (s) => {
                s.videos.error = e.message;
                return s;
              }),
            finalize: () => {
              patchState(this.state, (s) => {
                s.videos.complete = true;
                s.videos.loading = false;
                return s;
              });
            },
            next: (resp) => {
              patchState(this.state, (s) => {
                s.videos.value[this.getRequestKey(id)] = resp.results || [];
                return s;
              });
            },
          }),
        );
      }),
    ),
  );

  readonly fetchImages = rxMethod<number>(
    pipe(
      tap(() =>
        patchState(this.state, (s) => {
          s.images.loading = true;
          return s;
        }),
      ),
      optimizedFetch(this.getRequestKey, (id) => {
        return this.api.getTvSeriesImages(id, this.locale.split('-')[0]).pipe(
          tapResponse({
            error: (e: Error) =>
              patchState(this.state, (s) => {
                s.images.error = e.message;
                return s;
              }),
            finalize: () => {
              patchState(this.state, (s) => {
                s.images.complete = true;
                s.images.loading = false;
                return s;
              });
            },
            next: (resp) => {
              patchState(this.state, (s) => {
                s.images.value[this.getRequestKey(id)] = resp;
                return s;
              });
            },
          }),
        );
      }),
    ),
  );

  readonly backdropPath = computed(() => {
    return `${this.config.imageBaseUrl}1920_and_h800_multi_faces${this.details().value.backdrop_path}`;
  });

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
    this.fetchVideos(id);
    this.fetchImages(id);
    this.fetchDetails(id);
    this.fetchCredits(id);
    this.fetchReviews(id);
    this.fetchKeywords(id);
    this.fetchExternalIds(id);
    this.fetchRecommendations(id);
  }
}
