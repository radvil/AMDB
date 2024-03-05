import { MediaUrl } from './media-type';

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: MediaUrl;
  vote_average: number;
  vote_count: number;
  width: number;
}
