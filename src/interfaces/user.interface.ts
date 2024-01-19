import { MovieDetails } from "./movie.interface";

export type UserState = {
  loading: boolean;
  user: UserData | null;
  error: Error | null;
};

export type UserActions =
  | { type: "start fetch user" }
  | { type: "finish fetch user"; payload: UserData }
  | { type: "fail fetch user"; payload: Error }
  | { type: "start updating watched show" }
  | { type: "finish updating watched show"; payload: UserData }
  | { type: "fail updating watched show"; payload: Error };

export type UserData = {
  id: string;
  createdAt: string;
  displayName: string;
  email: string;
  watchedMovies: MovieDetails[];
};
