export interface MovieCast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;
  adult: boolean;
  known_for_department: string;
  original_name: string;
  popularity: number;
  total_episode_count: number;
  roles: Array<{
    credit_id: string;
    character: string;
    episode_count: number;
  }>;
}

