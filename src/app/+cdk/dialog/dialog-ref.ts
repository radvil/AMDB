import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

/**
 * A reference to the dialog itself.
 * Can be injected into the component added to the overlay and then used to close itself.
 */
export class DialogRef {
  readonly #afterClosedSubject = new Subject<any>();

  /**
   * Closes the overlay. You can optionally provide a result.
   */
  close(result?: any) {
    this.overlayRef.dispose();
    this.#afterClosedSubject.next(result);
    this.#afterClosedSubject.complete();
  }

  /**
   * An Observable that notifies when the overlay has closed
   */
  readonly afterClosed = this.#afterClosedSubject.asObservable();

  constructor(private overlayRef: OverlayRef) {}
}
