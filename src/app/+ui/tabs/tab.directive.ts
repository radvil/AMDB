import {
  Directive,
  Input,
  booleanAttribute,
  computed,
  input,
  model,
  signal,
} from '@angular/core';

// TODO: Make this a templateRef instead!!!
@Directive({
  standalone: true,
  selector: '[uiTab]',
  exportAs: 'uiTab',
  host: {
    '[attr.appearance]': 'appearance()',
    '[class.tab-active]': 'isActive()',
  },
})
export class UiTab {
  readonly id = computed(() => this.title().toLowerCase());
  readonly title = model.required<string>({ alias: 'tabTitle' });
  readonly appearance = model('default');
  readonly disabled = input(false, { transform: booleanAttribute });
  #active = signal(false);
  readonly isActive = this.#active;

  @Input()
  set active(v: string | number | boolean) {
    this.#active.set(booleanAttribute(v));
  }

  get active(): boolean {
    return this.#active();
  }
}
