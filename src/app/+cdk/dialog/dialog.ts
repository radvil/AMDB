import {
  DIALOG_DATA,
  Dialog,
  type DialogConfig,
  DialogRef,
} from "@angular/cdk/dialog";
import { Injectable, type TemplateRef, type Type, inject } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DialogService {
  protected cdkDialog = inject(Dialog);

  /**
   * Open a custom component in an overlay
   */
  open<Ref, Data, Cmp>(
    cmp: Type<Cmp> | TemplateRef<Cmp>,
    cfg: DialogConfig<Data, DialogRef<Ref, Cmp>> = {},
  ) {
    return this.cdkDialog.open(cmp, {
      backdropClass: "app-overlay-backdrop",
      panelClass: "app-overlay-panel",
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      ...cfg,
    });
  }
}

export function injectDialogData<T>() {
  return inject<T>(DIALOG_DATA);
}

export function injectDialogRef<Cmp, Ref = unknown>() {
  return inject<DialogRef<Ref, Cmp>>(DialogRef);
}
