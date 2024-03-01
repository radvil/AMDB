import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IoScrollService {
  protected zone = inject(NgZone);
  protected doc = inject(DOCUMENT);

  init(): void {
    const options: IntersectionObserverInit = {
      // This classifies the "intersection" as being a bit outside the
      // viewport. The intent here is give the elements a little time to react
      // to the change before the element is actually visible to the user.
      // rootMargin: '300px 0px 300px 0px',
      // threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '0px',
      threshold: 0,
    };
    const callback: IntersectionObserverCallback = ([
      { target, isIntersecting },
    ]) => {
      const classNames = target.getAttribute('data-io-class')?.split(' ');
      if (classNames && isIntersecting) {
        classNames.forEach((name) => target.classList.add(name));
      }
    };
    setTimeout(() => {
      const observer = new IntersectionObserver(callback, options);
      this.doc
        .querySelectorAll('[data-io-class]')
        .forEach((x) => observer.observe(x));
    }, 1000);
  }
}
