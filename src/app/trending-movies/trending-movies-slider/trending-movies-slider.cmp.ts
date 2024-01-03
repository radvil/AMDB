import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { type Swiper } from 'swiper';
import { MovieThumbPreviewCmp } from '../../+ui/movie-thumb-preview/movie-thumb-preview.cmp';

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
  selector: 'app-trending-movies-slider',
  styleUrl: 'trending-movies-slider.cmp.scss',
  templateUrl: 'trending-movies-slider.cmp.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FastSvgComponent, MovieThumbPreviewCmp],
})
export class TrendingMoviesSliderCmp {
  @ViewChild('swiperView')
  protected swiperView!: ElementRef<SwiperElement>;

  readonly items = SWIPER_DATA;

  get swiper() {
    return this.swiperView.nativeElement.swiper;
  }
}
