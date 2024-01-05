export type TBDMSortDirection = 'asc' | 'desc';

export type TBDMSortType =
  | 'popularity'
  | 'release_date'
  | 'revenue'
  | 'primary_release_date'
  | 'original_title'
  | 'vote_average'
  | 'vote_count';

export type TBDMSortByValues = `${TBDMSortType}.${TBDMSortDirection}`;

export type TMDBSortOptions = { [k: string]: string | number | boolean } & {
  sort_by?: TBDMSortByValues;
};
