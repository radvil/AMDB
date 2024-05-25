import type { DialogConfig } from "@angular/cdk/dialog";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { ByPassResourceUrlPipe, injectDialogRef } from "@cdk";
import type { Tmdb } from "@libs/tmdb";
import { FastSvgComponent } from "@push-based/ngx-fast-svg";
import { ScreenService } from "../layout/screen.service";
import { UiRipple } from "../ripple/ripple.directive";

@Component({
  standalone: true,
  selector: "app-video-popup",
  templateUrl: "video-popup.cmp.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiRipple, FastSvgComponent, ByPassResourceUrlPipe],
})
export class VideoPopupCmp {
  readonly ref = injectDialogRef<VideoPopupCmp>();
  readonly screen = inject(ScreenService);
  readonly dimension = computed(() => {
    return this.screen.lg() ? { w: 960, h: 480 } : { w: 360, h: 270 };
  });

  get data() {
    return this.ref.config.data as Tmdb.Video;
  }

  static mergeConfig<D, R>(changes: DialogConfig) {
    return <DialogConfig<D, R>>{
      backdropClass: ["app-trailer-dialog-backdrop", "backdrop-blur-lg"],
      panelClass: [
        "app-trailer-dialog-panel",
        "bg-white",
        "dark:bg-gray-800",
        "rounded-lg",
      ],
      hasBackdrop: true,
      ...changes,
    };
  }
}
