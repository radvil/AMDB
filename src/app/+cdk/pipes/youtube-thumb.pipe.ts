import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'ytThumb',
})
export class YouTubeThumbPipe implements PipeTransform {
  transform(key: string): string {
    return `https://i.ytimg.com/vi/${key}/hqdefault.jpg`;
  }
}
