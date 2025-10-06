import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users", // GET method is default, no need to specify method
      providesTags: ["Users"],
    }),
    approveUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    rejectUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useApproveUserMutation,
  useRejectUserMutation,
  useDeleteUserMutation,
} = userApi;
