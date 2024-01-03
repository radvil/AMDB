import { Component } from '@angular/core';
import { AppShellCmp } from './app-shell/app-shell.cmp';
import { TrendingMoviesSliderCmp } from './trending-movies/trending-movies-slider/trending-movies-slider.cmp';

@Component({
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.cmp.scss',
  templateUrl: './app.cmp.html',
  imports: [AppShellCmp, TrendingMoviesSliderCmp],
})
export class AppCmp {}
