import type { MediaType, MediaUrl } from './media-type';

export interface PersonAlias {
  id: number;
  adult: boolean;
  backdrop_path: MediaUrl;
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
  gender: 1 | 2;
  known_for_department: string;
  profile_path: MediaUrl;
  known_for: Array<PersonAlias>;
}

export interface PersonDetail extends Person {
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string | null;
  place_of_birth: string;
  profile_path: MediaUrl;
}
