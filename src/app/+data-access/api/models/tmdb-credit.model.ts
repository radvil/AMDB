export interface TMDBMovieCredits {
  id: number;
  cast: TMDBMovieCast[];
  crew: TMDBMovieCrew[];
}

export interface TMDBMovieCrew {
  credit_id: number;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: string;
}

export interface TMDBMovieCast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;
}
