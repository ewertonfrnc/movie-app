import { MovieDetails, SeasonDetails } from "./show.interface";

export type UserData = {
  id: string;
  createdAt: string;
  displayName: string;
  email: string;
  watchedMovies: MovieDetails[];
  seriesFinishedSeasons: SeasonDetails[];
  seriesWatchlist: MovieDetails[];
};
