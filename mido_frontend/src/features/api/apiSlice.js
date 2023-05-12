import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://worflow-backend.onrender.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("X-Frame-Options", "DENY");
      }
      return headers;
    },
  }),
  tagTypes: ["onLogin", "whenCreatedOrRetrieved"],
  endpoints: (builder) => ({}),
});
