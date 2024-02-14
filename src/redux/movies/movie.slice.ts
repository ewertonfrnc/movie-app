import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MovieGenre,
  SerializedShow,
  Show,
  SUPAEpisode,
  TMDBShow,
} from '../../interfaces/show.interface';

type InitialState = {
  loading: boolean;
  movie: Show | null;
  isMovieOnDB: boolean;
  isWatchedByCurrentUser: boolean;
  watchedEpisodes: SUPAEpisode[];
  movieGenres: MovieGenre[];
  error: Error | null;

  watchList: SerializedShow[];
};

const initialState: InitialState = {
  loading: false,
  movie: null,
  isMovieOnDB: false,
  isWatchedByCurrentUser: false,
  watchedEpisodes: [],
  movieGenres: [],
  error: null,

  watchList: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setWatchList: (state, action: PayloadAction<SerializedShow[]>) => {
      state.watchList = action.payload;
    },
    setMovieGenre: (state, action: PayloadAction<MovieGenre[]>) => {
      state.movieGenres = action.payload.genres;
    },
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
  setWatchList,
  setMovieGenre,
  setWatchedMovie,
  setIsWatchedMovie,
  setWatchedEpisodes,
  setMovieError,
} = movieSlice.actions;
export default movieSlice.reducer;
