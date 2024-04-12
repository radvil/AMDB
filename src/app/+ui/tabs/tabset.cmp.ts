import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  ViewEncapsulation,
  computed,
  contentChildren,
} from "@angular/core";
import { FastSvgComponent } from "@push-based/ngx-fast-svg";
import { UiButton } from "../button/button.directive";
import { UiRipple } from "../ripple/ripple.directive";
import { UiTab } from "./tab.directive";

type ChangeTabEvent = {
  previousSelected: UiTab;
  selectedTab: UiTab;
};

@Component({
  standalone: true,
  selector: "ui-tabset",
  styleUrl: "tabset.cmp.scss",
  templateUrl: "tabset.cmp.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiTab, UiRipple, UiButton, FastSvgComponent],
})
export class UiTabset {
  readonly tabs = contentChildren(UiTab);
  readonly tabsLen = computed(() => this.tabs().length);
  protected selectedTab = computed(() => this.tabs().find((t) => t.active));

  readonly changeTab = new EventEmitter<ChangeTabEvent>();

  selectTab(selectedTab: UiTab): void {
    const previousSelected = this.selectedTab();
    if (selectedTab.disabled() || !previousSelected) return;
    previousSelected.active = false;
    selectedTab.active = true;
    this.changeTab.emit({
      previousSelected,
      selectedTab,
    });
  }

  ngAfterContentInit(): void {
    if (!this.selectedTab()) {
      const firstTab = this.tabs().at(0);
      if (firstTab) {
        firstTab.active = true;
      }
    }
  }
}
