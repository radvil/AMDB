// TODO: create library instead of using this project structure
//
import { TMDBMovie } from '../+data-access/api/models/tmdb-movie.model';
import {
  TMDBPaginateOptions,
  TMDBPaginateResult,
} from '../+data-access/api/models/tmdb-paginate.model';
import { TMDBSortOptions } from '../+data-access/api/models/tmdb-sort.model';

export type TMDBDiscoverOptions = TMDBPaginateOptions &
  TMDBSortOptions & {
    with_cast?: string;
    with_genres?: string;
  };

export type TMDBDiscoverResponse = TMDBSortOptions &
  TMDBPaginateResult<TMDBMovie>;

export function getTMDBPaginateOptions(
  options?: TMDBPaginateOptions,
): TMDBPaginateOptions {
  return { page: options?.page ?? 1 };
}

export function getTMDBSortOptions(options?: TMDBSortOptions): TMDBSortOptions {
  return { sort_by: options?.sort_by || 'popularity.desc' };
}

export function getTMDBMovieOptions(
  options: TMDBPaginateOptions = {},
): TMDBDiscoverOptions {
  const discoverOptions = {
    ...getTMDBPaginateOptions(options),
    ...getTMDBSortOptions(options),
  };
  return discoverOptions;
}
