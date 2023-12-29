import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';
import { register } from 'swiper/element/bundle';

/**
 * **🚀 Register global swiper element**
 *
 */
export function provideSwiperElement() {
  return makeEnvironmentProviders([
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: () => (): Promise<void> => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            register();
            resolve();
          });
        });
      },
    },
  ]);
}
