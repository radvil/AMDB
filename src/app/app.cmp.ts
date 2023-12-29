import { Component } from '@angular/core';
import { AppShellCmp } from './app-shell/app-shell.cmp';
import { UpcomingSliderCmp } from './upcoming-slider/upcoming-slider.cmp';

@Component({
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.cmp.scss',
  templateUrl: './app.cmp.html',
  imports: [AppShellCmp, UpcomingSliderCmp],
})
export class AppCmp {}
