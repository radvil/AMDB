import {
  Directive,
  ElementRef,
  type OnDestroy,
  type OnInit,
  inject,
  input,
} from '@angular/core';
import { UiIoRootService } from './io-root.service';

@Directive({
  standalone: true,
  selector: '[ioChild],[io-child]',
})
export class UiIoChild implements OnInit, OnDestroy {
  protected observer = inject(UiIoRootService);
  protected host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly classNames = input.required<string>({ alias: 'ioChild' });

  ngOnDestroy(): void {
    this.observer.remove(this.host.nativeElement);
  }

  ngOnInit(): void {
    this.observer.add(this.host.nativeElement, this.classNames());
  }
}
