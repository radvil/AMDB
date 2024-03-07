import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Tmdb } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import {
  ScreenService,
  UiIoChild,
  UiRipple,
  UiSliderContainer,
  UiSliderContent,
} from '@ui';

@Component({
  standalone: true,
  selector: 'ui-posters-slider',
  templateUrl: 'posters-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UiRipple,
    UiIoChild,
    UiSliderContainer,
    UiSliderContent,
    FastSvgComponent,
  ],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class UiPostersSlider {
  protected screen = inject(ScreenService);
  readonly posters = input<Tmdb.Image[]>([]);
  readonly loading = input<boolean | undefined>(undefined);
  get baseMediaUrl() {
    return 'https://image.tmdb.org/t/p/w';
  }
}
