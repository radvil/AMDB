import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieState, PeopleState, TvShowState } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { UiMovieCardsSliderCmp } from '../+ui/movie-cards-slider/movie-cards-slider.cmp';
import { UiPeopleCardsSliderCmp } from '../+ui/people-cards-slider/people-cards-slider.cmp';
import { UiRippleDirective } from '../+ui/ripple/ripple.directive';
import { UiTvShowCardsSliderCmp } from '../+ui/tv-show-cards-slider/tv-show-cards-slider.cmp';
import { MoviesSliderCmp } from '../movies-slider/movies-slider.cmp';
import { UiIoChildDirective } from '../+ui/io-scroll/io-child.directive';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MoviesSliderCmp,
    UiMovieCardsSliderCmp,
    UiTvShowCardsSliderCmp,
    UiPeopleCardsSliderCmp,
    UiRippleDirective,
    FastSvgComponent,
    UiIoChildDirective,
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
