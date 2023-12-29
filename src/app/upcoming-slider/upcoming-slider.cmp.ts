import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { type Swiper } from 'swiper';

type SwiperElement = HTMLElement & { swiper: Swiper };
type SwiperItem = { url: string };

const SWIPER_DATA: SwiperItem[] = [
  { url: 'https://swiperjs.com/demos/images/nature-1.jpg' },
  { url: 'https://swiperjs.com/demos/images/nature-2.jpg' },
  { url: 'https://swiperjs.com/demos/images/nature-3.jpg' },
  { url: 'https://swiperjs.com/demos/images/nature-4.jpg' },
  { url: 'https://swiperjs.com/demos/images/nature-5.jpg' },
  { url: 'https://swiperjs.com/demos/images/nature-6.jpg' },
  { url: 'https://swiperjs.com/demos/images/nature-7.jpg' },
  { url: 'https://swiperjs.com/demos/images/nature-8.jpg' },
  { url: 'https://swiperjs.com/demos/images/nature-9.jpg' },
  { url: 'https://swiperjs.com/demos/images/nature-10.jpg' },
];

@Component({
  standalone: true,
  selector: 'app-upcoming-slider',
  styleUrl: 'upcoming-slider.cmp.scss',
  templateUrl: 'upcoming-slider.cmp.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingSliderCmp {
  @ViewChild('swiperView')
  protected swiperView!: ElementRef<SwiperElement>;

  readonly items = SWIPER_DATA;

  get swiper() {
    return this.swiperView.nativeElement.swiper;
  }
}
