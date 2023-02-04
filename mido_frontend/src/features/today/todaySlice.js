import { apiSlice } from "../api/apiSlice";

export const todaySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToday: builder.query({
      query: (date) => ({
        url: `/today/one/${date}`,
        method: "GET",
      }),
      providesTags: ["whenDayChanged"],
    }),
    createDay: builder.mutation({
      query: (body) => ({
        url: `/today`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["whenDayChanged"],
    }),
    updateDay: builder.mutation({
      query: ({ body, id }) => ({
        url: `/today/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["whenDayChanged"],
    }),
    deleteDay: builder.mutation({
      query: (id) => ({
        url: `/today/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodayQuery,
  useCreateDayMutation,
  useDeleteDayMutation,
  useUpdateDayMutation,
} = todaySlice;
