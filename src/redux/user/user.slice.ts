import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../interfaces/user.interface';
import { TMDBShow } from '../../interfaces/show.interface';

type InitialState = {
  userData: UserData | null;
  watchedMovies: TMDBShow[];
  error: Error | null;
};

const initialState: InitialState = {
  userData: null,
  watchedMovies: [],
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    updateWatchedMovies: (state, action: PayloadAction<TMDBShow[]>) => {
      if (state.userData) {
        state.userData = { ...state.userData, watchedMovies: action.payload };
      }
    },
    setUserError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setUserError, updateWatchedMovies } = userSlice.actions;
export default userSlice.reducer;
