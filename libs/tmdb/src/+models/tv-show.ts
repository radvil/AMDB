import { MediaUrl } from "./media-type";

type DateString = `${number}-${number}-${number}`;

export interface TvShow {
  backdrop_path: `/${string}`;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: MediaUrl;
  vote_average: 5;
  vote_count: 13;
}

export interface TvSeriesDetails {
  adult: boolean;
  backdrop_path: MediaUrl;
  name: string;
  next_episode_to_air: number | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: `/${string}`;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  episode_run_time: number[];
  first_air_date: string;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: DateString;
    episode_type: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: MediaUrl;
  };
  genres: Array<{
    id: number;
    name: string;
  }>;
  created_by: Array<{
    id: number;
    name: string;
    gender: number;
    credit_id: string;
    profile_path: MediaUrl;
  }>;
  networks: Array<{
    id: number;
    logo_path: MediaUrl;
    name: string;
    origin_country: string;
  }>;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: MediaUrl;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  seasons: Array<{
    id: number;
    air_date: string;
    episode_count: number;
    name: string;
    overview: string;
    poster_path: MediaUrl;
    season_number: number;
    vote_average: number;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
}

export interface TvSeriesKeyword {
  id: number;
  name: string;
}

export interface ExternalIds {
  id: number;
  imdb_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  tvdb_id?: number | null;
  freebase_mid?: string | null;
  freebase_id?: string | null;
  tvrage_id?: string | null;
}
