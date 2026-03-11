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
  original_title: "War of the Worlds";
  popularity: number;
  video: boolean;
  vote_count: number;
}

export default Movie;
