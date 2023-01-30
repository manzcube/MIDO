import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let token = localStorage.getItem("token");

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["whenPersonUpdated", "whenPersonsListChanged"],
  endpoints: (builder) => ({
    getPersons: builder.query({
      query: () => ({
        url: "/persons",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["whenPersonsListChanged", "whenPersonUpdated"],
    }),
    getOnePerson: builder.query({
      query: (id) => ({
        url: `/persons/${id}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["whenPersonUpdated"],
    }),
    setPerson: builder.mutation({
      query: (body) => ({
        url: "/persons",
        method: "POST",
        // fetchBaseQuesry will auto JSON-serialize body for us
        body,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["whenPersonsListChanged"],
    }),
    updatePerson: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `/persons/${id}`,
        method: "PUT",
        // fetchBaseQuesry will auto JSON-serialize body for us
        body: updatedData,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["whenPersonUpdated"],
    }),
    deletePerson: builder.mutation({
      query: (id) => ({
        url: `/persons/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["whenPersonsListChanged"],
    }),
  }),
});

export const {
  useGetPersonsQuery,
  useGetOnePersonQuery,
  useSetPersonMutation,
  useUpdatePersonMutation,
  useDeletePersonMutation,
} = apiSlice;
