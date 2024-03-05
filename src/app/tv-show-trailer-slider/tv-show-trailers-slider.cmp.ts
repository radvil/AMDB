import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  OnInit,
  computed,
  inject,
  input,
} from '@angular/core';
import { YouTubeThumbPipe } from '@cdk';
import {
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
  UiRipple,
  UiSliderContainer,
  UiSliderContent,
} from '@ui';
import { pipe, tap } from 'rxjs';

type State = WithContext<Record<string, Tmdb.Video[]>>;

@Component({
  standalone: true,
  selector: 'app-tv-show-trailers-slider',
  templateUrl: 'tv-show-trailers-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    YouTubeThumbPipe,
    UiRipple,
    UiIoChild,
    UiSliderContainer,
    UiSliderContent,
    FastSvgComponent,
  ],
})
export class TvShowTrailersSliderCmp implements OnInit {
  protected locale = inject(LOCALE_ID);
  protected screen = inject(ScreenService);
  protected api = inject(TmdbHttpApiService);
  readonly id = input.required<number>({ alias: 'tvShowId' });
  readonly state = signalState<State>({
    loading: false,
    value: {},
  });

  readonly videos = computed(() => {
    const { value, loading } = this.state();
    return {
      value: value[this.getRequestKey(this.id())],
      loading,
    };
  });

  readonly getRequestKey = (id: number) => {
    return `${id}-${this.locale}`;
  };

  readonly fetchVideos = rxMethod<number>(
    pipe(
      tap(() => patchState(this.state, { loading: true })),
      optimizedFetch(this.getRequestKey, (id) => {
        return this.api.getTvSeriesVideos(id, this.locale).pipe(
          tapResponse({
            error: (e: Error) => patchState(this.state, { error: e }),
            finalize: () => {
              patchState(this.state, {
                complete: true,
                loading: false,
              });
            },
            next: (resp) => {
              patchState(this.state, (s) => {
                s.value[this.getRequestKey(id)] = resp.results || [];
                return s;
              });
            },
          }),
        );
      }),
    ),
  );

  ngOnInit(): void {
    this.fetchVideos(this.id());
  }
}
