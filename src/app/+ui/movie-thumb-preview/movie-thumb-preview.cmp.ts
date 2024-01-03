import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

function transformSize(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value;
}

@Component({
  standalone: true,
  selector: 'app-movie-thumb-preview',
  styleUrl: 'movie-thumb-preview.cmp.scss',
  templateUrl: 'movie-thumb-preview.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, NgTemplateOutlet, FastSvgComponent],
})
export class MovieThumbPreviewCmp {
  @Input({ transform: transformSize })
  width: number | string = 150;

  @ContentChild('thumbTitle', { static: true })
  thumbTitle?: TemplateRef<any>;

  @ContentChild('thumbDescription', { static: true })
  thumbDescription?: TemplateRef<any>;

  get durationLabelSize() {
    return `calc(${this.width} / 10)`;
  }

  get titleSize() {
    return `calc(${this.width} / 9)`;
  }

  get descSize() {
    return `calc(${this.width} / 12)`;
  }

  get iconSize() {
    return `calc(${this.width} / 4)`;
  }

  @Input({ required: true })
  data: any;
}
