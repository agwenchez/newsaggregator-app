import { combineReducers } from "@reduxjs/toolkit";
import { articlesApi, } from "./services";

const rootReducer = combineReducers({
//   auth: authReducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
