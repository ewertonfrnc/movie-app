import { api } from "../index";

// Show
export const fetchShowDetails = async (showId: number, mediaType: string) => {
  try {
    const { data } = await api.get(
      `/${
        mediaType === "tv" ? "tv" : "movie"
      }/${showId}?append_to_response=videos,images,credits`,
      { params: { language: "pt-BR" } },
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

// Movies
export const fetchTrendingMovies = async () => {
  try {
    const { data } = await api.get("/trending/movie/day", {
      params: { language: "pt-BR" },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
};
