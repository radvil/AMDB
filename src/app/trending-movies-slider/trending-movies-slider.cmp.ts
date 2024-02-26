import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { MovieState, TMDB_ENV_CONFIG, Tmdb } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { MovieThumbPreviewCmp } from '../+ui/movie-thumb-preview/movie-thumb-preview.cmp';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-trending-movies-slider',
  styleUrl: 'trending-movies-slider.cmp.scss',
  templateUrl: 'trending-movies-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FastSvgComponent, MovieThumbPreviewCmp],
})
export class TrendingMoviesSliderCmp {
  @ViewChild('swiperView')
  protected swiperView!: ElementRef<HTMLElement & { swiper: any }>;
  protected movies = inject(MovieState).nowPlayingMovies('en-US');
  protected config = inject(TMDB_ENV_CONFIG);

  get imageBaseUrl(): string {
    return this.config.imageBaseUrl;
  }

  get swiper() {
    return this.swiperView.nativeElement.swiper;
  }

  formatNumber(v: number): string {
    return Intl.NumberFormat().format(v);
  }

  getVote(item: Tmdb.Movie): string {
    return `${Math.floor(item.vote_average)}/10 (${this.formatNumber(item.vote_count)})`;
  }
}
