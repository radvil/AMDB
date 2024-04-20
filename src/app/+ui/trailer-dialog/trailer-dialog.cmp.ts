import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@cdk';

@Component({
  standalone: true,
  selector: 'app-trailer-dialog',
  styleUrl: 'trailer-dialog.cmp.scss',
  templateUrl: 'trailer-dialog.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailerDialogCmp {
  close(data?: any) {
    this.ref.close(data);
  }

  constructor(
    @Inject(DIALOG_DATA)
    readonly data: string,
    readonly ref: DialogRef,
  ) {
    console.warn(data)
  }
}
