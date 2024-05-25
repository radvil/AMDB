import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, tap } from "rxjs";
import { Breakpoints, type TBreakpoints } from "./screen.breakpoints";

@Injectable({ providedIn: "root" })
export class ScreenService {
  protected observer = inject(BreakpointObserver);

  readonly matched = (v: TBreakpoints) => {
    return this.observer.isMatched(`(min-width: ${Breakpoints[v]})`);
  };

  readonly sm = toSignal(
    this.observer
      .observe(`(min-width: ${Breakpoints.sm})`)
      .pipe(map((x) => x.matches)),
    { initialValue: this.matched("sm") },
  );

  readonly md = toSignal(
    this.observer.observe(`(min-width: ${Breakpoints.md})`).pipe(
      map((x) => x.matches),
      tap(console.warn),
    ),
    { initialValue: this.matched("md") },
  );

  readonly lg = toSignal(
    this.observer
      .observe(`(min-width: ${Breakpoints.lg})`)
      .pipe(map((x) => x.matches)),
    { initialValue: this.matched("lg") },
  );

  readonly xl = toSignal(
    this.observer
      .observe(`(min-width: ${Breakpoints.xl})`)
      .pipe(map((x) => x.matches)),
    { initialValue: this.matched("xl") },
  );

  readonly xl2 = toSignal(
    this.observer
      .observe(`(min-width: ${Breakpoints["2xl"]})`)
      .pipe(map((x) => x.matches)),
    { initialValue: this.matched("2xl") },
  );
}
