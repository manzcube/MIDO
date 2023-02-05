import { apiSlice } from "../api/apiSlice";

export const noteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: "/notes",
        method: "GET",
      }),
      providesTags: ["whenNotesListChanged"],
    }),
    createNote: builder.mutation({
      query: (body) => ({
        url: "/notes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["whenNotesListChanged"],
    }),
    updateNote: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["whenNotesListChanged"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["whenNotesListChanged"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = noteSlice;
