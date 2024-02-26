import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

export const provideTmdbImageLoader = (baseUrl: string) => {
  return {
    provide: IMAGE_LOADER,
    useValue: (config: ImageLoaderConfig) => {
      return `${baseUrl}${config.width}${config.src}`;
    },
  };
};
