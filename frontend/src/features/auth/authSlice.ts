import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../@types";
import { RootState } from "../../app/rootReducer";

const INITIAL_STATE: AuthState = {
  user: undefined,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    token: "",
  } as AuthState,

  reducers: {
    setCredentials: (_, action: PayloadAction<AuthState>) => {
      return { ...action.payload };
    },
    logout: () => {
      return INITIAL_STATE;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserToken = (state: RootState) => state.auth.token;
