import { apiSlice } from "../api/apiSlice";

export const workerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkers: builder.query({
      query: () => ({
        url: "/workers",
        method: "GET",
      }),
      providesTags: ["whenWorkersListChanged"],
    }),
    getOneWorker: builder.query({
      query: (id) => ({
        url: `/workers/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["whenUpdatingWorker"],
    }),
    createWorker: builder.mutation({
      query: (body) => ({
        url: "/workers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["whenWorkersListChanged"],
    }),
    updateWorker: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `/workers/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["whenWorkersListChanged", "whenUpdatingWorker"],
    }),
    deleteWorker: builder.mutation({
      query: (id) => ({
        url: `/workers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["whenWorkersListChanged"],
      providesTags: ["whenUpdatingWorker"],
    }),
  }),
});

export const {
  useGetWorkersQuery,
  useGetOneWorkerQuery,
  useCreateWorkerMutation,
  useDeleteWorkerMutation,
  useUpdateWorkerMutation,
} = workerSlice;
