import {
  APP_INITIALIZER,
  inject,
  makeEnvironmentProviders,
  type EnvironmentProviders,
} from "@angular/core";
import { UiIoRootService } from "./io-root.service";

export function provideIoScroll(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: (scrollService = inject(UiIoRootService)) => {
        return () => {
          scrollService.init();
        };
      },
    },
  ]);
}
