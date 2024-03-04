export namespace TmdbReqParams {
  export type GetMovieList = {
    language: string;
    page: number;
  };
  export type GetTvShowList = GetMovieList;
}
