import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { DialogModule, DialogService, YouTubeThumbPipe } from '@cdk';
import type { Tmdb } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import {
    ScreenService,
    UiIoChild,
    UiRipple,
    UiSliderContainer,
    UiSliderContent,
} from '@ui';
import { TrailerDialogCmp } from '../trailer-dialog/trailer-dialog.cmp';

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
    DialogModule,
    TrailerDialogCmp,
  ],
})
export class UiTrailersSlider {
  readonly screen = inject(ScreenService);
  readonly dialog = inject(DialogService);

  readonly videos = input<Tmdb.Video[]>([]);
  readonly loading = input<boolean | undefined>(undefined);

  openTrailerDialog(data: any) {
    this.dialog
      .open(TrailerDialogCmp, {
        hasBackdrop: true,
        backdropClass: "blurred-backdrop",
        panelClass: "trailer-dialog",
        data
      })
      .afterClosed.subscribe((data) => {
        console.log(data);
      });
  }
}
