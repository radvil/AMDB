import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { MarkdownPipe } from '@cdk';
import type { Tmdb } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { UiButton } from '../button/button.directive';
import { UiRipple } from '../ripple/ripple.directive';

@Component({
  standalone: true,
  selector: 'ui-latest-review-card',
  templateUrl: 'latest-review-card.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownPipe, UiRipple, UiButton, FastSvgComponent, DatePipe],
  host: { class: 'block ' },
})
export class UiLatestReviewCard {
  readonly review = input<Tmdb.Review>();
  readonly loading = input<boolean | undefined>(undefined);
  protected reviewClamped = signal(true);
  get baseMediaUrl() {
    return 'https://media.themoviedb.org/t/p/w';
  }
}
