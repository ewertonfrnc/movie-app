import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDetails } from "../../interfaces/show.interface";

type InitialState = {
  watchlistedMovies: MovieDetails[];
  watchedMovies: MovieDetails[];
  error: Error | null;
};

const initialState: InitialState = {
  watchlistedMovies: [],
  watchedMovies: [],
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setWatchedMovies: (state, action: PayloadAction<MovieDetails[]>) => {
      state.watchedMovies = action.payload;
    },
    setMovieError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const { setWatchedMovies, setMovieError } = movieSlice.actions;
export default movieSlice.reducer;
