import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const localBackend = "http://localhost:5000";
const publicBackend = "https://workflow-backend-z4e5.onrender.com";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: publicBackend,
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
