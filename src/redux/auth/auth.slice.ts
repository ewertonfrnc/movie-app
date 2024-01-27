import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

type InitialState = {
  loading: boolean;
  userId: string;
  user: User | null;
  isAuthenticated: boolean;
  error: Error | null;
};

const initialState: InitialState = {
  loading: false,
  userId: '',
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onAppStart: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setAuthUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = !!action.payload;
      state.user = action.payload;
    },
    setAuthError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    setAuthLogOut: (state) => {
      state.userId = '';
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { onAppStart, setAuthLogOut, setAuthUser, setAuthError } =
  authSlice.actions;
export default authSlice.reducer;
