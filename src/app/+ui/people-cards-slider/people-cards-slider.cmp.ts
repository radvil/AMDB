import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TMDB_ENV_CONFIG, Tmdb } from '@libs/tmdb';
import { UiSliderModule } from '../feature-slider/feature-slider.cmp';
import { ScreenService } from '../layout/screen.service';
import { UiRippleDirective } from '../ripple/ripple.directive';

@Component({
  standalone: true,
  selector: 'ui-people-cards-slider',
  templateUrl: 'people-cards-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiSliderModule, UiRippleDirective],
})
export class UiPeopleCardsSliderCmp {
  readonly screen = inject(ScreenService);
  readonly imageBaseUrl = inject(TMDB_ENV_CONFIG).imageBaseUrl;
  readonly people = input<Tmdb.Person[]>([]);
  readonly slidesPerView = input(4);
}
