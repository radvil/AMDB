import type { Image } from './image';
import type { Movie } from './movie';
import type { MovieCast } from './movie-cast';
import type { MovieCrew } from './movie-crew';
import type { Person } from './person';
import type { Review } from './review';
import type { TvSeriesKeyword, TvShow } from './tv-show';
import type { Video } from './video';

export namespace TmdbRespBody {
  export interface GetMovieList {
    page: number;
    results: Movie[];
    dates: {
      maximum: string;
      minimum: string;
    };
  }

  export interface GetTvShowList {
    page: number;
    results: TvShow[];
    dates: {
      maximum: string;
      minimum: string;
    };
  }

  export interface GetTvShowRecommendations {
    page: number;
    results: TvShow[];
    total_pages: number;
    total_results: number;
  }

  export interface GetPeopleList {
    page: number;
    results: Person[];
    dates: {
      maximum: string;
      minimum: string;
    };
  }

  export interface GetKeywordList {
    id: number;
    results: TvSeriesKeyword[];
  }

  export interface GetMovieCredits {
    id: number;
    cast: MovieCast[];
    crew: MovieCrew[];
  }

  export interface GetReviews {
    id: number;
    page: number;
    results: Review[];
  }

  export interface GetVideos {
    id: number;
    results: Video[];
  }

  export interface GetImages {
    id: number;
    logos: Image[];
    posters: Image[];
    backdrops: Image[];
  }
}
