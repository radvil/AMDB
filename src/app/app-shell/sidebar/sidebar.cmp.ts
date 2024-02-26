import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { ThemeService } from '../../theme/theme.service';
import { MenuItem } from '../menu-items';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  styleUrl: 'sidebar.cmp.scss',
  templateUrl: 'sidebar.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FastSvgComponent, RouterLink, RouterLinkActive, NgTemplateOutlet],
})
export class SidebarCmp {
  readonly container = viewChild<ElementRef<HTMLElement>>('container');
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
    childrenEl?.classList.toggle('hidden');
  }

  closeBackdrop(e: any) {
    if (!this.containerElement?.contains(e.target)) {
      this.opened.set(false);
    }
  }
}
