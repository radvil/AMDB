import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, fromEvent, map, switchMap, tap } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[uiRipple],[ui-ripple]',
})
export class UiRipple implements AfterViewInit {
  readonly #destroyRef = inject(DestroyRef);
  protected renderer = inject(Renderer2);
  readonly elRef: ElementRef<HTMLElement> = inject(ElementRef);
  readonly rippleColor = input<string | undefined>(undefined);

  get host(): HTMLElement {
    return this.elRef.nativeElement;
  }

  ngAfterViewInit(): void {
    const mousedown$ = fromEvent<MouseEvent>(this.host, 'mousedown').pipe(
      filter(() => !(this.host as any)?.disabled),
      map((e) => this.createRippler(this.host, e)),
      tap((rippleItem) => {
        this.host.appendChild(rippleItem);
      }),
    );
    const mouseup$ = fromEvent<MouseEvent>(this.host, 'mouseup').pipe(
      debounceTime(2000),
      tap(() => {
        const existings = this.host.getElementsByClassName('ripple-item');
        while (existings.length) {
          this.host.removeChild(existings[0]);
        }
      }),
    );
    mousedown$
      .pipe(
        switchMap(() => mouseup$),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }

  protected createRippler(container: HTMLElement, e: MouseEvent) {
    const parentRect = container.getBoundingClientRect();
    const size = container.offsetWidth;
    const styles: string[] = [
      `top: ${e.offsetY - parentRect.width / 2}px`,
      `left: ${e.offsetX - parentRect.height / 2}px`,
      `height: ${size}px`,
      `width: ${size}px`,
    ];
    if (this.rippleColor) {
      styles.push(`background-color: ${this.rippleColor}`);
    }
    const rippler: HTMLSpanElement = this.renderer.createElement('span');
    rippler.className = 'ripple-item';
    rippler.setAttribute('style', styles.join(';'));
    return rippler;
  }
}
