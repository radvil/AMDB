import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Renderer2,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FastSvgComponent } from "@push-based/ngx-fast-svg";
import {
  filter,
  fromEvent,
  interval,
  map,
  merge,
  of,
  switchMap,
  tap,
} from "rxjs";
import { UiRipple } from "../ripple/ripple.directive";
import { UiSliderContent } from "./slider-content.directive";

@Component({
  standalone: true,
  selector: "ui-slider-container",
  templateUrl: "slider-container.cmp.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [UiSliderContent, FastSvgComponent, UiRipple],
  host: {
    class: "overflow-hidden relative h-fit block",
  },
})
export class UiSliderContainer {
  protected destroyRef = inject(DestroyRef);
  protected renderer = inject(Renderer2);
  readonly ref = inject(ElementRef);
  readonly showNavigation = input(true, { transform: booleanAttribute });
  readonly navigationOffset = input("3rem");
  readonly activeIndex = model(0, { alias: "startIndex" });
  readonly playInterval = input(0, { alias: "autoPlayInterval" });
  readonly totalItems = computed(() => this.sliders().length || 0);
  readonly activeSlide = computed(() => {
    if (!this.sliders()?.length) return undefined;
    return this.sliders()[this.activeIndex()];
  });

  readonly prevButton = viewChild<ElementRef<HTMLAnchorElement>>("prevButton");
  readonly nextButton = viewChild<ElementRef<HTMLAnchorElement>>("nextButton");
  readonly wrapper = viewChild.required<HTMLElement, ElementRef<HTMLElement>>(
    "wrapperView",
    { read: ElementRef },
  );
  readonly sliders = contentChildren<UiSliderContent, ElementRef<HTMLElement>>(
    UiSliderContent,
    { read: ElementRef },
  );

  readonly slidePerView = input(1);
  readonly direction = input<"vertical" | "horizontal">("horizontal");
  readonly sliderStyles = computed(() => {
    const basisValue =
      this.totalItems() < this.slidePerView() ? 0 : 100 / this.slidePerView();
    return {
      "flex-basis": `${basisValue}%`,
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

  #appendStyles(el: HTMLElement, record: Record<string, string>): void {
    for (const [k, v] of Object.entries(record)) {
      this.renderer.setStyle(el, k, v);
    }
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
        dir === "horizontal" ? -(unitW * activeIndex) : -(unitH * activeIndex);
      const translate = dir === "horizontal" ? "translateX" : "translateY";
      this.#appendStyles(wrapper, { transform: `${translate}(${offset}px)` });
    });
  }

  SETUP_WRAPPER_INIT = false;
  #setupWrapper(): void {
    if (this.SETUP_WRAPPER_INIT || this.direction() !== "vertical") return;
    const activeSlide = this.activeSlide();
    const wrapper = this.wrapper();
    untracked(() => {
      if (wrapper && activeSlide) {
        // console.log('SETUP_VERT_WRAPPER_INIT');
        const unitH = activeSlide.nativeElement.clientHeight;
        this.#appendStyles(wrapper.nativeElement, {
          "max-height": `${unitH * this.slidePerView()}px`,
        });
        this.SETUP_WRAPPER_INIT = true;
      }
    });
  }

  SETUP_SLIDERS_INIT = false;
  #setupSliders(): void {
    if (this.SETUP_SLIDERS_INIT) return;
    const sliders = this.sliders();
    const sliderStyles = this.sliderStyles();
    untracked(() => {
      if (sliders.length && sliderStyles) {
        // console.warn('SETUP_SLIDERS_INIT » ', this.direction());
        for (const item of sliders) {
          if (item.nativeElement) {
            this.#appendStyles(item.nativeElement, sliderStyles);
          }
        }
        this.SETUP_SLIDERS_INIT = true;
      }
    });
  }

  protected onSlidersInit = effect(() => {
    this.#setupWrapper();
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
          return fromEvent(el, "click").pipe(map(() => "prev" as const));
        }),
      ),
      of(nextEl).pipe(
        filter(Boolean),
        switchMap((el) => {
          return fromEvent(el, "click").pipe(map(() => "next" as const));
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
        fromEvent(this.ref.nativeElement, "mouseenter").pipe(
          tap(() => paused.set(true)),
        ),
        fromEvent(this.ref.nativeElement, "mouseleave").pipe(
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
