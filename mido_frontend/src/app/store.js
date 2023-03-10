import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice.js";
import { apiSlice } from "../features/api/apiSlice.js";

export default configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  //This enables caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.REACT_APP_NODE_ENV == "development",
});
