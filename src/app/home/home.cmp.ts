import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieState, PeopleState, TvShowState } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import {
  UiIoChild,
  UiMovieCardsSlider,
  UiPeopleCardsSlider,
  UiRipple,
  UiTvShowCardsSlider,
} from '@ui';
import { MoviesSliderCmp } from '../movies-slider/movies-slider.cmp';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MoviesSliderCmp,
    FastSvgComponent,
    UiMovieCardsSlider,
    UiTvShowCardsSlider,
    UiPeopleCardsSlider,
    UiRipple,
    UiIoChild,
  ],
})
export class HomeCmp {
  readonly movieState = inject(MovieState);
  readonly tvShowState = inject(TvShowState);
  readonly peopleState = inject(PeopleState);
  readonly nowPlaying = this.movieState.nowPlayingMovies();
  readonly topRated = this.movieState.topRated();
  readonly popular = this.movieState.popular();
  readonly airingToday = this.tvShowState.airingToday();
  readonly trendingPeople = this.peopleState.trendingPeople();
}
