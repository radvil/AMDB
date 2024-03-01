import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  NgModule,
  Renderer2,
  ViewEncapsulation,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import {
  filter,
  fromEvent,
  interval,
  merge,
  of,
  switchMap,
  map,
  tap,
} from 'rxjs';
import { UiRippleDirective } from '../ripple/ripple.directive';

@Directive({
  selector: '[uiSliderItem],[ui-slider-item]',
  host: {
    class: 'flex-grow flex-shrink-0 w-full',
  },
})
export class UiSliderItemDirective {}

@Component({
  selector: 'ui-slider-container',
  styleUrl: 'feature-slider.cmp.scss',
  templateUrl: 'feature-slider.cmp.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'overflow-hidden relative h-fit',
  },
})
export class UiSliderContainerCmp {
  protected destroyRef = inject(DestroyRef);
  protected renderer = inject(Renderer2);
  readonly ref = inject(ElementRef);
  readonly showNavigation = input(true);
  readonly activeIndex = model(0, { alias: 'startIndex' });
  readonly playInterval = input(0, { alias: 'autoPlayInterval' });
  readonly totalItems = computed(() => this.sliders().length || 0);
  readonly activeSlide = computed(() => {
    if (!this.sliders()?.length) return undefined;
    return this.sliders()[this.activeIndex()];
  });

  readonly prevButton = viewChild<ElementRef<HTMLAnchorElement>>('prevButton');
  readonly nextButton = viewChild<ElementRef<HTMLAnchorElement>>('nextButton');
  readonly wrapper = viewChild.required<HTMLElement, ElementRef<HTMLElement>>(
    'wrapperView',
    { read: ElementRef },
  );
  readonly sliders = contentChildren<
    UiSliderItemDirective,
    ElementRef<HTMLElement>
  >(UiSliderItemDirective, { read: ElementRef });

  intervalId: any = null;

  readonly slidePerView = input(1);
  readonly direction = input<'vertical' | 'horizontal'>('horizontal');
  readonly sliderStyles = computed(() => {
    const basisValue = 100 / this.slidePerView();
    return {
      'flex-basis': `${basisValue}%`,
    };
  });

  updateIndex(newIndex: number): void {
    this.activeIndex.set(newIndex);
  }

  prev(): void {
    const nextIndex = this.activeIndex() - 1;
    if (nextIndex < 0) {
      this.activeIndex.set(this.sliders().length - 1);
    } else {
      this.activeIndex.set(nextIndex);
    }
  }

  next(): void {
    const nextIndex = this.activeIndex() + 1;
    if (nextIndex === this.sliders().length) {
      this.activeIndex.set(0);
    } else {
      this.activeIndex.set(nextIndex);
    }
  }

  #appendStyles(el: HTMLElement, v: Record<string, string>): void {
    Object.entries(v).forEach(([k, v]) => {
      this.renderer.setStyle(el, k, v);
    });
  }

  #setTransformation(): void {
    const activeIndex = this.activeIndex();
    const activeSlide = this.activeSlide();
    const dir = this.direction();
    if (!activeSlide) return;
    untracked(() => {
      // TODO: change style on prev | next function call! NOT HERE...
      const wrapper = this.wrapper().nativeElement;
      if (!wrapper || !activeSlide.nativeElement) return;
      const unitW = activeSlide.nativeElement.clientWidth;
      const unitH = activeSlide.nativeElement.clientHeight;
      const offset =
        dir === 'horizontal' ? -(unitW * activeIndex) : -(unitH * activeIndex);
      const translate = dir === 'horizontal' ? 'translateX' : 'translateY';
      this.#appendStyles(wrapper, { transform: `${translate}(${offset}px)` });
    });
  }

  SETUP_MAX_HEIGHT = false;
  #setupVerticalWrapper(): void {
    if (this.SETUP_MAX_HEIGHT || this.direction() !== 'vertical') return;
    const activeSlide = this.activeSlide();
    const wrapper = this.wrapper();
    untracked(() => {
      if (wrapper && activeSlide) {
        // console.log('SETUP_VERT_WRAPPER_INIT');
        const unitH = activeSlide.nativeElement.clientHeight;
        this.#appendStyles(wrapper.nativeElement, {
          'max-height': `${unitH * this.slidePerView()}px`,
        });
        this.SETUP_MAX_HEIGHT = true;
      }
    });
  }

  SETUP_SLIDERS_STYLES = false;
  #setupSliders(): void {
    if (this.SETUP_SLIDERS_STYLES) return;
    const sliders = this.sliders();
    const sliderStyles = this.sliderStyles();
    untracked(() => {
      if (sliders.length && sliderStyles) {
        // console.warn('SETUP_SLIDERS_INIT » ', this.direction());
        sliders.forEach((item) => {
          if (item.nativeElement) {
            this.#appendStyles(item.nativeElement, sliderStyles);
          }
        });
        this.SETUP_SLIDERS_STYLES = true;
      }
    });
  }

  protected onSlidersInit = effect(() => {
    this.#setupVerticalWrapper();
    this.#setTransformation();
    this.#setupSliders();
  });

  ngAfterViewInit(): void {
    const prevEl = this.prevButton()?.nativeElement;
    const nextEl = this.nextButton()?.nativeElement;
    if (!prevEl || !nextEl) return;
    merge(
      of(prevEl).pipe(
        filter(Boolean),
        switchMap((el) => {
          return fromEvent(el, 'click').pipe(map(() => 'prev' as const));
        }),
      ),
      of(nextEl).pipe(
        filter(Boolean),
        switchMap((el) => {
          return fromEvent(el, 'click').pipe(map(() => 'next' as const));
        }),
      ),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((direction) => {
        this[direction]();
      });

    const playInterval = this.playInterval();
    if (playInterval > 0) {
      const paused = signal(false);
      merge(
        fromEvent(this.ref.nativeElement, 'mouseenter').pipe(
          tap(() => paused.set(true)),
        ),
        fromEvent(this.ref.nativeElement, 'mouseleave').pipe(
          tap(() => paused.set(false)),
        ),
        interval(this.playInterval()).pipe(
          filter(() => !paused()),
          tap(() => this.next()),
        ),
      )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
  }
}

@NgModule({
  declarations: [UiSliderContainerCmp, UiSliderItemDirective],
  exports: [UiSliderContainerCmp, UiSliderItemDirective],
  imports: [FastSvgComponent, UiRippleDirective, NgTemplateOutlet],
})
export class UiSliderModule {}
