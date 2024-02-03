import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Show, SUPAEpisode } from '../../interfaces/show.interface';

type InitialState = {
  loading: boolean;
  movie: Show | null;
  isMovieOnDB: boolean;
  isWatchedByCurrentUser: boolean;
  watchedEpisodes: SUPAEpisode[];
  error: Error | null;
};

const initialState: InitialState = {
  loading: false,
  movie: null,
  isMovieOnDB: false,
  isWatchedByCurrentUser: false,
  watchedEpisodes: [],
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setWatchedMovie: (state, action: PayloadAction<Show | null>) => {
      state.movie = action.payload;
      state.isMovieOnDB = !!action.payload;
    },
    setIsWatchedMovie: (state, action: PayloadAction<boolean>) => {
      state.isWatchedByCurrentUser = action.payload;
    },
    setWatchedEpisodes: (state, action: PayloadAction<SUPAEpisode[]>) => {
      state.watchedEpisodes = action.payload;
    },
    setMovieError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setWatchedMovie,
  setIsWatchedMovie,
  setWatchedEpisodes,
  setMovieError,
} = movieSlice.actions;
export default movieSlice.reducer;
