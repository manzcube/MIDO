import { apiSlice } from "../api/apiSlice";

let token = localStorage.getItem("token");

export const activitySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => ({
        url: "/activities",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["whenActivityListChanges"],
    }),
    getOneActivity: builder.query({
      query: (id) => ({
        url: `/activities/${id}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
    createActivity: builder.mutation({
      query: (body) => ({
        url: "/activities",
        method: "POST",
        body,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["whenActivityListChanges"],
    }),
    updateActivity: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `/activities/${id}`,
        method: "PUT",
        body: updatedData,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["whenActivityListChanges"],
    }),
    deleteActivity: builder.mutation({
      query: (id) => ({
        url: `/activities/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
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
