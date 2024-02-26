type ImgSizeName<T> = T extends string
  ? `${T}w`
  : 'size has to include strings ending with "w"';

export interface ImageDimensions {
  SIZE: ImgSizeName<string>;
  WIDTH: number;
  HEIGHT: number;
}
