import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MerchantAuthState } from "../../@types";
import { RootState } from "../../app/rootReducer";

const INITIAL_STATE: MerchantAuthState = {
  merchant: undefined,
  access_token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    merchant: undefined,
    access_token: undefined,
  } as MerchantAuthState,

  reducers: {
    setCredentials: (_, action: PayloadAction<MerchantAuthState>) => {
      return { ...action.payload };
    },
    logout: () => {
      return INITIAL_STATE;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentMerchant = (state: RootState) => state.auth.merchant;
export const selectCurrentMerchantToken = (state: RootState) => state.auth.access_token;
