import { Directive, inject, input } from '@angular/core';
import { UiTabset } from './tabset.cmp';

@Directive({
  standalone: true,
  selector: '[uiTabContent],[ui-tab-content]',
})
export class UiTabContent {
  readonly title = input.required<string>({ alias: 'tabTitle' });
  readonly parent = inject(UiTabset);

  ngOnInit(): void {
    const title = this.title();
    this.parent.pushMenu({
      id: title.toLowerCase(),
      name: title,
    });
  }
}
