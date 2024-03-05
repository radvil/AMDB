import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { ThemeService, UiRipple } from '@ui';
import { MenuItem, menuItems } from './menu-items';
import { SearchDialogCmp } from './search-dialog/search-dialog.cmp';
import { SidebarCmp } from './sidebar/sidebar.cmp';

@Component({
  standalone: true,
  selector: 'app-shell',
  styleUrl: 'app-shell.cmp.scss',
  templateUrl: 'app-shell.cmp.html',
  host: { class: 'block min-h-[100svh]' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    FastSvgComponent,
    UiRipple,
    NgTemplateOutlet,
    RouterLinkWithHref,
    RouterLinkActive,
    SidebarCmp,
    SearchDialogCmp,
  ],
})
export class AppShellCmp {
  readonly themeService = inject(ThemeService);
  readonly menuItems = signal<MenuItem[]>(menuItems);
  readonly year = new Date().getFullYear();
  searchOpened = false;
  sidebarOpened = false;
}
