import { MovieDetails } from "./show.interface";

export type UserState = {
  loading: boolean;
  user: UserData | null;
  error: Error | null;
};

export type UserData = {
  id: string;
  createdAt: string;
  displayName: string;
  email: string;
  watchedMovies: MovieDetails[];
};
