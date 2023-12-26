import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.cmp.html',
  styleUrl: './app.cmp.scss',
})
export class AppCmp {
  title = 'amdb';
}
