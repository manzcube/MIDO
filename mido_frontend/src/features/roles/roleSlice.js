import { apiSlice } from "../api/apiSlice";

export const roleSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ({
        url: "/roles",
        method: "GET",
      }),
      providesTags: ["whenRolesListChanged"],
    }),
    getOneRole: builder.query({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "GET",
      }),
    }),
    createRole: builder.mutation({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["whenRolesListChanged"],
    }),
    updateRole: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["whenRolesListChanged"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["whenRolesListChanged"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetOneRoleQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
} = roleSlice;
