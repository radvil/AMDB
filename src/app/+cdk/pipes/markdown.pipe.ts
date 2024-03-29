import { Pipe, type PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  standalone: true,
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string) {
    if (value && value.length > 0) {
      return marked(value);
    }
    return value;
  }
}

