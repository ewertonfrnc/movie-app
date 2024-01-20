import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../interfaces/user.interface";

type InitialState = {
  user: UserData | null;
  error: Error | null;
};

const initialState: InitialState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    setUserError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setUserError } = userSlice.actions;
export default userSlice.reducer;
