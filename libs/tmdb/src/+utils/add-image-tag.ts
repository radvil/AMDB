import { POSTER_FALLBACK } from '../+constants/tmdb';
import { ImageDimensions } from '../+models';
import { ImageTag } from '../+models/image-tag';

export function addImageTag<T>(
  _res: T,
  options: {
    pathProp: keyof T;
    dims: ImageDimensions;
    fallback?: string;
    sizes?: string;
    srcset?: string;
  },
): T & ImageTag {
  let { fallback } = options;
  const { pathProp, dims, sizes, srcset } = options;
  fallback = fallback || POSTER_FALLBACK;

  const res = _res as T & ImageTag;

  if (sizes !== undefined) {
    res.imgSizes = sizes || '';
    res.imgSrcset = srcset || '';
  }

  res.imgSrc = res[pathProp] ? res[pathProp] + '' : fallback;
  res.imgWidth = dims.WIDTH;
  res.imgHeight = dims.HEIGHT;
  res.imgRatio = res.imgWidth / res.imgHeight;

  return res;
}
