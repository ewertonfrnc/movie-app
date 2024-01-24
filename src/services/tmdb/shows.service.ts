import { api } from "../index";
import { MovieDetails, SeasonDetails } from "../../interfaces/show.interface";

// Movies
export async function fetchTrendingMovies() {
  try {
    const { data } = await api.get("/trending/movie/day", {
      params: { language: "pt-BR" },
    });

    console.log("data", data);

    return data.results;
  } catch (error) {
    console.log("error", error);
    console.error(error);
  }
}

// Tv Shows
export async function fetchTrendingTvShows() {
  try {
    const { data } = await api.get("/trending/tv/day", {
      params: { language: "pt-BR" },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchShowDetails(showId: number, mediaType: string) {
  try {
    const { data } = await api.get<MovieDetails>(
      `/${
        mediaType === "tv" ? "tv" : "movie"
      }/${showId}?append_to_response=videos,images,credits`,
      { params: { language: "pt-BR" } },
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchShowSeasonDetails(
  seriesId: number,
  seasonNumber: number,
): Promise<SeasonDetails | undefined> {
  try {
    const { data } = await api.get(`/tv/${seriesId}/season/${seasonNumber}`, {
      params: { language: "pt-BR" },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}
