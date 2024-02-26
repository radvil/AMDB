import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShellCmp } from './app-shell/app-shell.cmp';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.cmp.html',
  imports: [AppShellCmp, RouterOutlet],
})
export class AppCmp {}
