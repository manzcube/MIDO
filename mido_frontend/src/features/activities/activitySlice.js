import { apiSlice } from "../api/apiSlice";

let token = localStorage.getItem("token");

export const activitySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => ({
        url: "/activities",
        method: "GET",
      }),
      providesTags: ["whenActivityListChanges"],
    }),
    getOneActivity: builder.query({
      query: (id) => ({
        url: `/activities/${id}`,
        method: "GET",
      }),
    }),
    createActivity: builder.mutation({
      query: (body) => ({
        url: "/activities",
        method: "POST",
        body,
      }),
      invalidatesTags: ["whenActivityListChanges"],
    }),
    updateActivity: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `/activities/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["whenActivityListChanges"],
    }),
    deleteActivity: builder.mutation({
      query: (id) => ({
        url: `/activities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["whenActivityListChanges"],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetOneActivityQuery,
  useCreateActivityMutation,
  useDeleteActivityMutation,
  useUpdateActivityMutation,
} = activitySlice;
