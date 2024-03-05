import { Directive } from '@angular/core';
import { UiSliderContent } from '../slider/slider-content.directive';

@Directive({
  standalone: true,
  selector: '[uiTabContent],[ui-tab-content]',
  hostDirectives: [UiSliderContent],
})
export class UiTabContent {}
