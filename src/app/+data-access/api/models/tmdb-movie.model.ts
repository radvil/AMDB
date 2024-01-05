import { TMDBMediaType } from './tmdb-media.model';

export interface TMDBMovie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: TMDBMediaType;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
