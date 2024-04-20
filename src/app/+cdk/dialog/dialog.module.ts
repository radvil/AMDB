import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [OverlayModule],
  exports: [OverlayModule],
})
export class DialogModule { }

