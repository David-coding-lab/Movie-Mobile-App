const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

const getMovies = async (
  category: "popular" | "new" | "upcoming" | "random",
) => {
  let endpoint = "";
  switch (category) {
    case "popular":
      endpoint = "/movie/popular";
      break;
    case "new":
      endpoint = "/movie/now_playing";
      break;
    case "upcoming":
      endpoint = "/movie/upcoming";
      break;
    case "random":
      // For random, we often fetch popular and then pick a random index
      // or fetch a random page
      const randomPage = Math.floor(Math.random() * 10) + 1;
      endpoint = `/movie/top_rated?page=${randomPage}`;
      break;
    default:
      endpoint = "/movie/popular";
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    if (category === "random") {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      return data.results[randomIndex];
    }

    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export default getMovies;
