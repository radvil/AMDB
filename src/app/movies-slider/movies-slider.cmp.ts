import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { TMDB_ENV_CONFIG, Tmdb } from '@libs/tmdb';
import { UiSliderModule } from '../+ui/feature-slider/feature-slider.cmp';
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
  readonly thumbSize = input<'sm' | 'lg'>('sm');
  protected playInterval = computed(() => (this.autoPlay() ? 3_000 : 0));

  protected layoutClassName = computed(() => {
    return this.thumbPosition() === 'right' ? 'flex-row' : 'flex-col';
  });

  protected mainClassName = computed(() => {
    return this.thumbPosition() === 'right' ? 'w-2/3' : 'w-full';
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
