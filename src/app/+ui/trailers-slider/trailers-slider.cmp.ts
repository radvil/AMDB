import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { DialogService, YouTubeThumbPipe } from '@cdk';
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
import { filter } from 'rxjs';

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
  readonly dialogService = inject(DialogService);

  readonly videos = input<Tmdb.Video[]>([]);
  readonly loading = input<boolean | undefined>(undefined);

  openTrailerDialog(data: Tmdb.Video) {
    const ref: DialogRef<Tmdb.Video, TrailerDialogCmp> =
      this.dialogService.open(
        TrailerDialogCmp,
        TrailerDialogCmp.mergeConfig({ data }),
      );
    ref.closed.pipe(filter(Boolean)).subscribe((x) => {
      console.log('dialog closed with data » ', x);
    });
  }
}
