import { MediaType } from './media-type';

export interface PersonAlias {
  id: number;
  adult: boolean;
  backdrop_path: `/${string}`;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Person {
  id: number;
  adult: boolean;
  name: string;
  original_name: string;
  media_type: MediaType;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: `/${string}`;
  known_for: Array<PersonAlias>;
}
