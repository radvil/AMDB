import { DialogConfig } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectDialogRef } from '@cdk';
import type { Tmdb } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { UiRipple } from '../ripple/ripple.directive';

@Component({
  standalone: true,
  selector: 'app-trailer-dialog',
  styleUrl: 'trailer-dialog.cmp.scss',
  templateUrl: 'trailer-dialog.cmp.html',
  imports: [UiRipple, FastSvgComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailerDialogCmp {
  protected ref = injectDialogRef<TrailerDialogCmp>();

  get data() {
    return this.ref.config.data as Tmdb.Video;
  }

  static mergeConfig<D, R>(changes: DialogConfig) {
    return <DialogConfig<D, R>>{
      backdropClass: ['app-trailer-dialog-backdrop', 'backdrop-blur-lg'],
      panelClass: ['app-trailer-dialog-panel', 'bg-white', 'dark:bg-gray-800'],
      hasBackdrop: true,
      ...changes,
    };
  }

  constructor() {
    console.warn(this.data);
  }
}
