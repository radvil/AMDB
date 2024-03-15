import { DatePipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TMDB_ENV_CONFIG, type Tmdb } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { ScreenService } from '../layout/screen.service';
import { UiRipple } from '../ripple/ripple.directive';
import { UiSliderContainer } from '../slider/slider-container.cmp';
import { UiSliderContent } from '../slider/slider-content.directive';

@Component({
  standalone: true,
  selector: 'ui-movie-cards-slider',
  templateUrl: 'movie-cards-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UiSliderContent,
    UiSliderContainer,
    UiRipple,
    FastSvgComponent,
    DecimalPipe,
    DatePipe,
  ],
})
export class UiMovieCardsSlider {
  readonly screen = inject(ScreenService);
  readonly imageBaseUrl = inject(TMDB_ENV_CONFIG).imageBaseUrl;
  readonly movies = input<Tmdb.Movie[]>([]);
  readonly slidesPerView = input(4);
}
