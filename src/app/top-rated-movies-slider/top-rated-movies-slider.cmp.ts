import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MovieState, TMDB_ENV_CONFIG } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { UiSliderModule } from '../+ui/feature-slider/feature-slider.cmp';
import { UiRippleDirective } from '../+ui/ripple/ripple.directive';
import { DecimalPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-top-rated-movies-slider',
  templateUrl: 'top-rated-movies-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiSliderModule, UiRippleDirective, FastSvgComponent, DecimalPipe],
})
export class TopRatedMoviesSlider {
  readonly imageBaseUrl = inject(TMDB_ENV_CONFIG).imageBaseUrl;
  readonly movies = inject(MovieState).topRated();
  readonly slidesPerView = input(4);
}
