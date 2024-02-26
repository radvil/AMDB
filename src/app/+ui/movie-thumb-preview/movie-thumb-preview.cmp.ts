import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { TMDB_ENV_CONFIG, Tmdb } from '@libs/tmdb';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

@Component({
  standalone: true,
  selector: 'app-movie-thumb-preview',
  styleUrl: 'movie-thumb-preview.cmp.scss',
  templateUrl: 'movie-thumb-preview.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, NgTemplateOutlet, FastSvgComponent],
})
export class MovieThumbPreviewCmp {
  readonly title = contentChild('thumbTitle', { read: TemplateRef });
  readonly desc = contentChild('thumbDescription', { read: TemplateRef });
  protected config = inject(TMDB_ENV_CONFIG);
  readonly data = input.required<Tmdb.Movie>();
  readonly width = input(154);
  readonly height = input(205);
  readonly iconSize = computed(() => `calc(${this.width()} / 4)`);

  get imageBaseUrl(): string {
    return this.config.imageBaseUrl;
  }

  formatNumber(v: number): string {
    return Intl.NumberFormat().format(v);
  }

  getVote(item: Tmdb.Movie): string {
    return `${Math.floor(item.vote_average)}/10 (${this.formatNumber(item.vote_count)})`;
  }
}
