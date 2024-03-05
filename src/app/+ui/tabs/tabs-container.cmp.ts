import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiTabContent } from './tab-content.directive';

@Component({
  standalone: true,
  imports: [UiTabContent],
  templateUrl: 'tabs-container.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTabsContainer {}
