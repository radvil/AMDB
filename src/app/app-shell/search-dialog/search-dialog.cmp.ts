import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  model,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { debounceTime, filter, fromEvent, of, switchMap } from 'rxjs';
import { SearchItem } from '../../../../libs/tmdb/src/+models';
// import { DataService } from "../../+core/apis";
// import { SearchItem } from "../../+core/models";

@Component({
  standalone: true,
  selector: 'am-search-dialog',
  templateUrl: 'search-dialog.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FastSvgComponent],
  host: { '[class.hidden]': '!opened()' },
})
export class SearchDialogCmp implements AfterViewInit {
  protected destroy$ = inject(DestroyRef);
  protected router = inject(Router);
  // protected dataApi = inject(DataService);
  readonly opened = model(false);
  readonly results = signal<SearchItem[]>([]);
  readonly searchForm = new FormControl();
  readonly dialog = viewChild.required<ElementRef<HTMLElement>>('dialog');
  readonly input = viewChild<ElementRef<HTMLInputElement>>('inputView');

  get dialogElement() {
    return this.dialog().nativeElement;
  }

  closeBackdrop(e: any) {
    if (!this.dialogElement.contains(e.target)) {
      this.opened.set(false);
    }
  }

  openResult(item: SearchItem): void {
    this.opened.set(false);
    this.router.navigateByUrl(item.link);
  }

  ngAfterViewInit(): void {
    fromEvent(document, 'keydown')
      .pipe(
        filter((e: any) => e.ctrlKey && e.key === 'k'),
        takeUntilDestroyed(this.destroy$),
      )
      .subscribe((e: Event) => {
        e.preventDefault();
        untracked(() => {
          const opened = this.opened();
          this.opened.set(!opened);
        });
      });

    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((keyword) => {
          return of([]).pipe(takeUntilDestroyed(this.destroy$));
        }),
      )
      .subscribe((items) => {
        this.results.set(items);
      });
  }

  constructor() {
    effect(() => {
      const next = this.opened() ? 'add' : 'remove';
      document.body.classList[next]('!overflow-hidden');
      if (!this.opened()) {
        this.searchForm.reset();
      } else {
        setTimeout(() => {
          this.input()?.nativeElement.focus();
        });
      }
    });
  }
}
