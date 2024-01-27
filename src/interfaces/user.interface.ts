import { TMDBMovie, SeasonDetails } from './show.interface';

export type UserData = {
  id: string;
  createdAt: string;
  displayName: string;
  email: string;
  watchedMovies: TMDBMovie[];
  seriesFinishedSeasons: SeasonDetails[];
  seriesWatchlist: TMDBMovie[];
};
