import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TMDB_ENV_CONFIG, type Tmdb } from '@libs/tmdb';
import { ScreenService } from '../layout/screen.service';
import { UiRipple } from '../ripple/ripple.directive';
import { UiSliderContainer } from '../slider/slider-container.cmp';
import { UiSliderContent } from '../slider/slider-content.directive';

@Component({
  standalone: true,
  selector: 'ui-people-cards-slider',
  templateUrl: 'people-cards-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiRipple, UiSliderContainer, UiSliderContent],
})
export class UiPeopleCardsSlider {
  readonly screen = inject(ScreenService);
  readonly imageBaseUrl = inject(TMDB_ENV_CONFIG).imageBaseUrl;
  readonly people = input<Tmdb.Person[]>([]);
  readonly slidesPerView = input(4);
}
