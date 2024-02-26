import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrendingMoviesSliderCmp } from '../trending-movies-slider/trending-movies-slider.cmp';
import { UiSliderModule } from '../+ui/feature-slider/feature-slider.cmp';
import { MovieState, TMDB_ENV_CONFIG } from '@libs/tmdb';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TrendingMoviesSliderCmp, UiSliderModule],
})
export class HomeCmp {
  readonly imageBaseUrl = inject(TMDB_ENV_CONFIG).imageBaseUrl;
  readonly state = inject(MovieState);
  readonly items = this.state.nowPlayingMovies();
  playInterval = 3000;
}
