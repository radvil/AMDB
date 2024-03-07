import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { YouTubeThumbPipe } from '@cdk';
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
  selector: 'ui-trailers-slider',
  templateUrl: 'trailers-slider.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    YouTubeThumbPipe,
    UiRipple,
    UiIoChild,
    UiSliderContainer,
    UiSliderContent,
    FastSvgComponent,
  ],
})
export class UiTrailersSlider {
  readonly videos = input<Tmdb.Video[]>([]);
  readonly screen = inject(ScreenService);
  readonly loading = input<boolean | undefined>(undefined);
}
