import { DatePipe, DecimalPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { RouterLinkWithHref } from "@angular/router";
import { TMDB_ENV_CONFIG, type Tmdb } from "@libs/tmdb";
import { FastSvgComponent } from "@push-based/ngx-fast-svg";
import { ScreenService } from "../layout/screen.service";
import { UiRipple } from "../ripple/ripple.directive";
import { UiSliderContainer } from "../slider/slider-container.cmp";
import { UiSliderContent } from "../slider/slider-content.directive";

@Component({
  standalone: true,
  selector: "ui-tv-show-cards-slider",
  templateUrl: "tv-show-cards-slider.cmp.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    DecimalPipe,
    RouterLinkWithHref,
    FastSvgComponent,
    UiRipple,
    UiSliderContent,
    UiSliderContainer,
  ],
})
export class UiTvShowCardsSlider {
  readonly screen = inject(ScreenService);
  readonly imageBaseUrl = inject(TMDB_ENV_CONFIG).imageBaseUrl;
  readonly tvShows = input<Tmdb.TvShow[]>([]);
  readonly slidesPerView = input(4);
}
