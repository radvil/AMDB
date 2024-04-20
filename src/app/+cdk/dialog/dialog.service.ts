import { ComponentType, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog-token';

const DEFAULT_OVERLAY_CONFIG: OverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'overlay-backdrop',
  panelClass: 'overlay-panel',
};

@Injectable({ providedIn: 'root' })
export class DialogService {
  /**
   * Open a custom component in an overlay
   */
  open<T, D = any>(
    component: ComponentType<T>,
    config: DialogConfig<D> = {},
  ): DialogRef {
    // Globally centered position strategy
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy,
      ...DEFAULT_OVERLAY_CONFIG,
      ...config
    });

    // Create dialogRef to return
    const ref = new DialogRef(overlayRef);

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: ref },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return ref;
  }

  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) {}
}
