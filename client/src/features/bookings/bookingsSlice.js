import { apiSlice } from "../api/apiSlice";

export const bookingsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (date) => ({
        url: `/fareharbor-webhook/${date}`,
        method: "GET"
      })
    }),
  }),
});

export const { useGetBookingsQuery } = bookingsSlice;
