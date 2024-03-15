import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  viewChild,
  type ElementRef,
} from "@angular/core";
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";
import { FastSvgComponent } from "@push-based/ngx-fast-svg";
import { ThemeService } from "@ui";
import type { MenuItem } from "../menu-items";

@Component({
  standalone: true,
  selector: "app-sidebar",
  styleUrl: "sidebar.cmp.scss",
  templateUrl: "sidebar.cmp.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FastSvgComponent,
    RouterLinkWithHref,
    RouterLinkActive,
    NgTemplateOutlet,
  ],
})
export class SidebarCmp {
  readonly container = viewChild<ElementRef<HTMLElement>>("container");
  readonly menuItems = input<MenuItem[]>([]);
  readonly themeApi = inject(ThemeService);
  readonly opened = model(false);

  get containerElement() {
    return this.container()?.nativeElement;
  }

  close(): void {
    this.opened.set(false);
  }

  open(): void {
    this.opened.set(true);
  }

  toggleExpand(childrenEl: HTMLElement, e?: Event): void {
    e?.preventDefault();
    childrenEl?.classList.toggle("hidden");
  }

  closeBackdrop(e: MouseEvent) {
    if (!this.containerElement || !e.target) return;
    if (!this.containerElement.contains(e.target as Node)) {
      this.opened.set(false);
    }
  }
}
