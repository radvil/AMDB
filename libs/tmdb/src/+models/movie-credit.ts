import { MovieCast } from './movie-cast';
import { MovieCrew } from './movie-crew';

export interface MovieCredits {
  id: number;
  cast: MovieCast[];
  crew: MovieCrew[];
}
