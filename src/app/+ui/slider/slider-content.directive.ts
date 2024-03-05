import { Directive } from "@angular/core";

@Directive({
  standalone: true,
  selector: '[uiSliderContent],[ui-slider-content]',
  host: {
    class: 'flex-grow flex-shrink-0 w-full',
  },
})
export class UiSliderContent {}


