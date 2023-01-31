import { apiSlice } from "../api/apiSlice";

let token = localStorage.getItem("token");

export const workerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkers: builder.query({
      query: () => ({
        url: "/workers",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["whenWorkerListChanged", "whenLogin"],
    }),
    getOneWorker: builder.query({
      query: (id) => ({
        url: `/workers/${id}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
    createWorker: builder.mutation({
      query: (body) => ({
        url: "/workers",
        method: "POST",
        body,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["whenWorkerListChanged"],
    }),
    updateWorker: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `/workers/${id}`,
        method: "PUT",
        body: updatedData,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["whenWorkerListChanged"],
    }),
    deleteWorker: builder.mutation({
      query: (id) => ({
        url: `/workers/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["whenWorkerListChanged"],
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
