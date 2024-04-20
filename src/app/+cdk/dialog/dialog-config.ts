import { ScrollStrategy } from "@angular/cdk/overlay";

export interface DialogConfig<D = any> {
  data?: D;
  panelClass?: string | string[];
  backdropClass?: string | string[];
  hasBackdrop?: boolean;
  scrollStrategy?: ScrollStrategy;
}
