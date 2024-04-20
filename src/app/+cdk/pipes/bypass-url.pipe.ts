import { Pipe, inject, type PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  standalone: true,
  name: 'bypassUrl',
})
export class ByPassResourceUrlPipe implements PipeTransform {
  protected sanitizer = inject(DomSanitizer);
  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
