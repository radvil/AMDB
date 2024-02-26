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
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { filter, fromEvent, map, switchMap } from 'rxjs';
import { UiRippleDirective } from '../ripple/ripple.directive';

@Directive({
  selector: '[uiSliderItem],[ui-slider-item]',
  host: { class: 'flex-grow flex-shrink-0' },
})
export class UiSliderItemDirective {}

@Component({
  selector: 'ui-slider-container',
  styleUrl: 'feature-slider.cmp.scss',
  templateUrl: 'feature-slider.cmp.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'overflow-hidden relative' },
})
export class UiSliderContainerCmp {
  protected destroyRef = inject(DestroyRef);
  protected renderer = inject(Renderer2);
  readonly ref = inject(ElementRef);
  readonly slideWrapper = viewChild.required('wrapperView', {
    read: ElementRef,
  });

  readonly sliders = contentChildren(UiSliderItemDirective, {
    read: ElementRef,
  });
  readonly showNavigation = input(true);
  readonly activeIndex = model(0, { alias: 'startIndex' });
  readonly playInterval = model(0, { alias: 'autoPlayInterval' });
  readonly totalItems = computed(() => this.sliders().length || 0);
  readonly activeSlide = computed(() => this.sliders()[this.activeIndex()]);

  intervalId: number | null = null;

  get currentSlideElement(): HTMLElement | undefined {
    return this.activeSlide()?.nativeElement;
  }

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

  protected onWrapperInit = effect(() => {
    const el = this.slideWrapper().nativeElement;
    untracked(() => {
      const horizontal = this.direction() === 'horizontal';
      if (horizontal) {
        this.#appendStyles(el, { 'flex-direction': 'row' });
      } else {
        this.#appendStyles(el, { 'flex-direction': 'column' });
        const unitH = this.currentSlideElement?.clientHeight || 0;
        this.#appendStyles(this.ref.nativeElement, {
          'max-height': `${unitH * this.slidePerView()}px`,
        });
      }
    });
  });

  protected onSlidersInit = effect(() => {
    const sliders = this.sliders();
    untracked(() => {
      const styles = this.sliderStyles();
      sliders.forEach((item) => {
        if (item.nativeElement) {
          this.#appendStyles(item.nativeElement, styles);
        }
      });
    });
  });

  protected onIndexChange = effect(() => {
    const activeIndex = this.activeIndex();
    untracked(() => {
      // TODO: change style on prev | next function call! NOT HERE...
      const wrapper = this.slideWrapper().nativeElement;
      if (!wrapper || !this.currentSlideElement) return;
      const dir = this.direction();
      const w = wrapper.offsetWidth;
      const unitH = this.currentSlideElement.clientHeight;
      const offset =
        dir === 'horizontal' ? -(w * activeIndex) : -(unitH * activeIndex);
      const translate = dir === 'horizontal' ? 'translateX' : 'translateY';
      this.#appendStyles(wrapper, {
        transform: `${translate}(${offset}px)`,
      });
      const playInterval = this.playInterval();
      if (playInterval > 0) {
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
          this.next();
        }, playInterval);
      }
    });
  });

  ngAfterViewInit(): void {
    type Direction = 'left' | 'right' | 'up' | 'down';
    const actionMap = {
      left: () => this.prev(),
      right: () => this.next(),
      up: () => this.prev(),
      down: () => this.next(),
    };
    fromEvent<TouchEvent>(this.ref.nativeElement, 'touchstart')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((vStart) => {
          const tsY = vStart.touches[0].clientY;
          const tsX = vStart.touches[0].clientY;
          return fromEvent<TouchEvent>(this.ref.nativeElement, 'touchend').pipe(
            map((vEnd) => {
              const teY = vEnd.changedTouches[0].clientY;
              const teX = vEnd.changedTouches[0].clientX;
              if (tsY > teY + 5) {
                return 'down';
              } else if (tsY < teY - 5) {
                return 'up';
              } else if (tsX > teX + 5) {
                return 'right';
              } else if (tsX < teX - 5) {
                return 'left';
              } else {
                return null;
              }
            }),
            filter(Boolean),
          );
        }),
      )
      .subscribe((direction: Direction) => {
        console.warn(direction.toUpperCase());
        // TODO: should respond for autoplay
        actionMap[direction]();
      });
  }
}

@NgModule({
  declarations: [UiSliderContainerCmp, UiSliderItemDirective],
  imports: [FastSvgComponent, UiRippleDirective, NgTemplateOutlet],
  exports: [UiSliderContainerCmp, UiSliderItemDirective],
})
export class UiSliderModule {}
