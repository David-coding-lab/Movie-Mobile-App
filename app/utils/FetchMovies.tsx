import { useState } from "react";

const FetchMovies = () => {
  const [movieList, setMovieList] = useState([
    {
      name: "",
      cast: "",
      preview: "",
      publishDate: "",
    },
  ]);

  return async function fetch() {
    return movieList;
  };
};

export default FetchMovies;
