import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { TMDB_ENV_CONFIG, type Tmdb } from "@libs/tmdb";
import { UiIoChild } from "../io-scroll/io-child.directive";
import { ScreenService } from "../layout/screen.service";
import { UiSliderContainer } from "../slider/slider-container.cmp";
import { UiSliderContent } from "../slider/slider-content.directive";

@Component({
  standalone: true,
  selector: "ui-tv-show-recommendations-slider",
  templateUrl: "tv-show-recommendations-slider.cmp.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiSliderContainer, UiSliderContent, UiIoChild],
})
export class UiTvShowRecommendationsSliderCmp {
  readonly config = inject(TMDB_ENV_CONFIG);
  readonly screen = inject(ScreenService);
  readonly data = input<Tmdb.TvShow[] | null>(null);
  readonly loading = input<boolean | undefined>(undefined);
}
