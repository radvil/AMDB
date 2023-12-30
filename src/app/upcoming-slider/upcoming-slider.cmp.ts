import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { type Swiper } from 'swiper';

type SwiperElement = HTMLElement & { swiper: Swiper };
type SwiperItem = {
  title: string;
  url: string;
  desc: string;
  duration: number;
};

const SWIPER_DATA: SwiperItem[] = [
  {
    url: 'https://swiperjs.com/demos/images/nature-1.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
  {
    url: 'https://swiperjs.com/demos/images/nature-2.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
  {
    url: 'https://swiperjs.com/demos/images/nature-3.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
  {
    url: 'https://swiperjs.com/demos/images/nature-4.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
  {
    url: 'https://swiperjs.com/demos/images/nature-5.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
  {
    url: 'https://swiperjs.com/demos/images/nature-6.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
  {
    url: 'https://swiperjs.com/demos/images/nature-7.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
  {
    url: 'https://swiperjs.com/demos/images/nature-8.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
  {
    url: 'https://swiperjs.com/demos/images/nature-9.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
  {
    url: 'https://swiperjs.com/demos/images/nature-10.jpg',
    desc: 'The quick brown fox jumps over the lazy dog.',
    title: 'Movie title here',
    duration: 120,
  },
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
