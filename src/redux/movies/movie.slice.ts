import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MovieWatchedByList,
  WatchedMovie,
} from '../../interfaces/show.interface';

type InitialState = {
  loading: boolean;
  movie: MovieWatchedByList | null;
  isMovieOnDB: boolean;
  isWatchedByCurrentUser: boolean;
  watchedByList: string[] | [];
  error: Error | null;
};

const initialState: InitialState = {
  loading: false,
  movie: null,
  isMovieOnDB: false,
  isWatchedByCurrentUser: false,
  watchedByList: [],
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setWatchedMovie: (
      state,
      action: PayloadAction<WatchedMovie | MovieWatchedByList | null>,
    ) => {
      state.movie = action.payload;
      state.isMovieOnDB = !!action.payload;
    },
    setMovieWatchedByList: (
      state,
      action: PayloadAction<MovieWatchedByList>,
    ) => {
      state.watchedByList = action.payload.watchedBy;
    },
    setIsWatchedMovie: (state, action: PayloadAction<boolean>) => {
      state.isWatchedByCurrentUser = action.payload;
    },
    setMovieError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setWatchedMovie,
  setIsWatchedMovie,
  setMovieWatchedByList,
  setMovieError,
} = movieSlice.actions;
export default movieSlice.reducer;
