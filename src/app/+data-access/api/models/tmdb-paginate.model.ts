export type TMDBPaginateOptions = {
  [key: string]: string | number | boolean;
} & { page?: number };

export interface TMDBPaginateResult<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}
