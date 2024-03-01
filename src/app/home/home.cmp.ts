import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieState } from '@libs/tmdb';
import { MoviesSliderCmp } from '../movies-slider/movies-slider.cmp';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoviesSliderCmp],
})
export class HomeCmp {
  readonly state = inject(MovieState);
  readonly nowPlayingMovies = this.state.nowPlayingMovies();
}
