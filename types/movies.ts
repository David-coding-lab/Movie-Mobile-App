interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
  homepage: string;
  imdb_id: string;
}

export type { Movie, MovieDetails };
export default Movie;
