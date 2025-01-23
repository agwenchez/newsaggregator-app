import { combineReducers } from "@reduxjs/toolkit";
import { articlesApi, authApi, preferencesApi, } from "./services";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [preferencesApi.reducerPath]: preferencesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
