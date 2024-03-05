import { Injectable, RendererFactory2, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiIoRootService {
  readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  protected mapping = new Map<Element, string>();
  protected io!: IntersectionObserver;

  add(el: Element, classNames: string): void {
    this.mapping.set(el, classNames);
    this.io.observe(el);
  }

  remove(el: Element): void {
    this.mapping.delete(el);
    this.io.unobserve(el);
  }

  ngOnDestroy(): void {
    this.mapping.clear();
    this.io.disconnect();
  }

  init(): void {
    const options: IntersectionObserverInit = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      // This classifies the "intersection" as being a bit outside the
      // viewport. The intent here is give the elements a little time to react
      // to the change before the element is actually visible to the user.
      // rootMargin: '0px',
      rootMargin: '300px 0px 300px 0px',
    };
    this.io = new IntersectionObserver((entries) => {
      entries.forEach((x) => {
        const classNames = this.mapping.get(x.target);
        if (classNames && x.isIntersecting) {
          classNames.split(' ').forEach((name) => {
            this.renderer.addClass(x.target, name);
          });
        }
      });
    }, options);
  }
}
