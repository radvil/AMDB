import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  model,
  signal,
  untracked,
  viewChild,
  type AfterViewInit,
  type ElementRef,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import type { Tmdb } from "@libs/tmdb";
import { FastSvgComponent } from "@push-based/ngx-fast-svg";
import { debounceTime, filter, fromEvent, of, switchMap } from "rxjs";

@Component({
  standalone: true,
  selector: "ui-search-dialog",
  templateUrl: "search-dialog.cmp.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FastSvgComponent],
  host: { "[class.hidden]": "!opened()" },
})
export class SearchDialogCmp implements AfterViewInit {
  protected destroy$ = inject(DestroyRef);
  protected router = inject(Router);
  readonly opened = model(false);
  readonly results = signal<Tmdb.SearchItem[]>([]);
  readonly saerchForm = new FormControl();
  readonly dialog = viewChild.required<ElementRef<HTMLDivElement>>("dialog");
  readonly input = viewChild<ElementRef<HTMLInputElement>>("inputView");

  get dialogElement() {
    return this.dialog().nativeElement;
  }

  closeBackdrop(e: MouseEvent) {
    if (!e.target) return;
    if (!this.dialogElement.contains(e.target as Node)) {
      this.opened.set(false);
    }
  }

  openResult(item: Tmdb.SearchItem): void {
    this.opened.set(false);
    this.router.navigateByUrl(item.link);
  }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(document, "keydown")
      .pipe(
        filter((e) => e.ctrlKey && e.key === "k"),
        takeUntilDestroyed(this.destroy$),
      )
      .subscribe((e: Event) => {
        e.preventDefault();
        untracked(() => {
          const opened = this.opened();
          this.opened.set(!opened);
        });
      });

    this.saerchForm.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(() => {
          return of([]).pipe(takeUntilDestroyed(this.destroy$));
        }),
      )
      .subscribe((items) => {
        this.results.set(items);
      });
  }

  constructor() {
    effect(() => {
      const next = this.opened() ? "add" : "remove";
      document.body.classList[next]("!overflow-hidden");
      if (!this.opened()) {
        this.saerchForm.reset();
      } else {
        setTimeout(() => {
          this.input()?.nativeElement.focus();
        });
      }
    });
  }
}
