import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieState } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { UiRippleDirective } from '../+ui/ripple/ripple.directive';
import { MoviesSliderCmp } from '../movies-slider/movies-slider.cmp';
import { TopRatedMoviesSlider } from '../top-rated-movies-slider/top-rated-movies-slider.cmp';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MoviesSliderCmp,
    TopRatedMoviesSlider,
    UiRippleDirective,
    FastSvgComponent,
  ],
})
export class HomeCmp {
  readonly state = inject(MovieState);
  readonly nowPlayingMovies = this.state.nowPlayingMovies();
}
