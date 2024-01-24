import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDetails } from "../../interfaces/show.interface";

type InitialState = {
  loading: boolean
  watchlistedMovies: MovieDetails[];
  watchedMovies: MovieDetails[];
  error: Error | null;
};

const initialState: InitialState = {
  loading: false,
  watchlistedMovies: [],
  watchedMovies: [],
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchCurrentMovie: (state, action: PayloadAction<MovieDetails[]>) => {
      state.watchedMovies = action.payload;
    },
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
