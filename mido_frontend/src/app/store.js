import { configureStore } from "@reduxjs/toolkit";
import workerReducer from "../features/workers/workerSlice.js";
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
});
