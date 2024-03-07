import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

type Size = 'sm' | 'md' | 'lg' | 'xl' | '';

const paddings: Record<Size, string> = {
  '': 'py-2 px-4',
  sm: 'py-1 px-2',
  md: 'py-2 px-4',
  lg: 'py-3 px-6',
  xl: 'py-4 px-8',
} as const;

@Directive({
  standalone: true,
  selector: 'button[uiButton],a[uiButton]',
  host: {
    '[class]': 'classNames()',
    '[disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled()',
  },
})
export class UiButton {
  readonly ref = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  readonly size = input<Size>('');
  readonly rounded = input<Size | undefined>(undefined);
  protected classNames = computed(() => {
    const size = this.size();
    const rounded =
      this.rounded() === undefined
        ? 'rounded-none'
        : `${size ? 'rounded-' + size : 'rounded'}`;
    const dynamicClasses = [paddings[size], rounded].join(' ');
    return twMerge(
      'block relative w-fit font-semibold select-none cursor-pointer transition-colors duration-200',
      dynamicClasses,
      this.bgClasses(),
    );
  });

  bgClasses(): string {
    return !this.disabled()
      ? 'bg-white dark:bg-gray-700'
      : 'bg-gray-50 dark:bg-gray-800';
  }

  disabled(): boolean {
    return this.ref.nativeElement.disabled;
  }
}
