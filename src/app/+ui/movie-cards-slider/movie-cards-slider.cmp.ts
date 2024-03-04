import { DatePipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TMDB_ENV_CONFIG, Tmdb } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { UiSliderModule } from '../feature-slider/feature-slider.cmp';
import { ScreenService } from '../layout/screen.service';
import { UiRippleDirective } from '../ripple/ripple.directive';

@Component({
  standalone: true,
  selector: 'ui-movie-cards-slider',
  templateUrl: 'movie-cards-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UiSliderModule,
    UiRippleDirective,
    FastSvgComponent,
    DecimalPipe,
    DatePipe,
  ],
})
export class UiMovieCardsSliderCmp {
  readonly screen = inject(ScreenService);
  readonly imageBaseUrl = inject(TMDB_ENV_CONFIG).imageBaseUrl;
  readonly movies = input<Tmdb.Movie[]>([]);
  readonly slidesPerView = input(4);
}
