export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
  url: `https://www.themoviedb.org/review/${string}`;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
}
