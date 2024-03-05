import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { TMDB_ENV_CONFIG, Tmdb } from '@libs/tmdb';
import {
  UiSliderContainerCmp,
  UiSliderModule,
} from '../+ui/feature-slider/feature-slider.cmp';
import { ScreenService } from '../+ui/layout/screen.service';
import { MovieThumbPreviewCmp } from '../+ui/movie-thumb-preview/movie-thumb-preview.cmp';

@Component({
  standalone: true,
  selector: 'app-movies-slider',
  styleUrl: 'movies-slider.cmp.scss',
  templateUrl: 'movies-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiSliderModule, MovieThumbPreviewCmp],
})
export class MoviesSliderCmp {
  readonly imageBaseUrl = inject(TMDB_ENV_CONFIG).imageBaseUrl;
  readonly thumbSlider = viewChild<UiSliderContainerCmp>('thumbSlider');
  readonly md = inject(ScreenService).md;
  readonly movies = input<Tmdb.Movie[]>([]);
  readonly autoPlay = input<boolean, string | boolean>(true, {
    transform: (v: string | boolean) => {
      if (typeof v === 'string') {
        return v === 'true' || v === '';
      }
      return v;
    },
  });
  readonly thumbPosition = input<'right' | 'bottom'>('right');
  readonly mainImageSize = computed(() =>
    this.thumbPosition() === 'right'
      ? { width: 500, height: 250 }
      : { width: 1280, height: 720 },
  );
  readonly thumbSize = input<'sm' | 'lg'>('sm');
  protected playInterval = computed(() => (this.autoPlay() ? 3_000 : 0));

  protected layoutClassName = computed(() => {
    return this.thumbPosition() === 'right' ? 'flex-row' : 'flex-col';
  });

  protected mainClassName = computed(() => {
    return !this.md()
      ? 'w-full'
      : this.thumbPosition() === 'right'
        ? 'w-2/3'
        : 'w-full';
  });

  protected thumbsClassName = computed(() => {
    return this.thumbPosition() === 'right' ? 'w-1/3' : 'w-full';
  });

  protected thumbsDirection = computed(() => {
    return this.thumbPosition() === 'right' ? 'vertical' : 'horizontal';
  });

  protected thumbsPerView = computed(() => {
    return this.thumbPosition() === 'right' ? 2 : 3;
  });

  formatNumber(v: number): string {
    return Intl.NumberFormat().format(v);
  }

  getVote(item: Tmdb.Movie): string {
    return `${Math.floor(item.vote_average)}/10 (${this.formatNumber(item.vote_count)})`;
  }
}
