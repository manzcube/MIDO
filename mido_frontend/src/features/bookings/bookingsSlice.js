import { apiSlice } from "../api/apiSlice";

export const bookingsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: "/fareharbor-webhook",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBookingsQuery } = bookingsSlice;
