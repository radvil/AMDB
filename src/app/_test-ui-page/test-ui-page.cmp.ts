import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiTab, UiTabset } from '@ui';

@Component({
  standalone: true,
  selector: 'app-test-ui-page',
  templateUrl: 'test-ui-page.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiTabset, UiTab],
})
export class TestUiPageCmp {}
