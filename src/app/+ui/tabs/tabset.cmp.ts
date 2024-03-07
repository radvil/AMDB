import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  contentChildren,
  signal,
  viewChild,
} from '@angular/core';
import { UiSliderContainer } from '../slider/slider-container.cmp';
import { UiSliderContent } from '../slider/slider-content.directive';
import { UiTabContent } from './tab-content.directive';
import { UiButton } from '../button/button.directive';
import { UiRipple } from '../ripple/ripple.directive';

interface TabMenuItem {
  id: string;
  name: string;
}

@Component({
  standalone: true,
  selector: 'ui-tabset',
  templateUrl: 'tabset.cmp.html',
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgClass,
    UiSliderContainer,
    UiSliderContent,
    UiTabContent,
    UiButton,
    UiRipple,
    NgTemplateOutlet,
  ],
})
export class UiTabset implements AfterContentInit {
  readonly tabContents = contentChildren(UiTabContent, { read: TemplateRef });
  protected _container = viewChild.required(UiSliderContainer);
  protected tabItems = signal<TabMenuItem[]>([]);

  get container() {
    return this._container();
  }

  pushMenu(item: TabMenuItem): void {
    this.tabItems.update((items) => {
      items.push(item);
      return items;
    });
  }

  popMenu(): void {
    this.tabItems.update((items) => {
      items.pop();
      return items;
    });
  }

  ngAfterContentInit(): void {
    // console.warn(this.tabContents());
  }
}
