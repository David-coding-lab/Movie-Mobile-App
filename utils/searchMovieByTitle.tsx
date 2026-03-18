export const SearchMovieByTitle = async (title: string) => {
  const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        title,
      )}`,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
