export const getMovieById = async (id: number) => {
  const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return null;
  }
};

export const getMovieCredits = async (id: number) => {
  const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`,
    );
    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return [];
  }
};

export const getSimilarMovies = async (id: number) => {
  const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US`,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
};
