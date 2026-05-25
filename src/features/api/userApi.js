import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /users — All users (admin)
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    // GET /users/pending — Pending registrations for admin review
    getPendingUsers: builder.query({
      query: () => "/users/pending",
      providesTags: ["Users"],
    }),

    // GET /users/:id — Single user
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),

    // PUT /users/:id — Update user
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    // PATCH /users/:id/approve — Admin approves pending user
    approveUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),

    // PATCH /users/:id/reject — Admin rejects pending user (with optional reason)
    rejectUser: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/users/${id}/reject`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["Users"],
    }),

    // PATCH /users/:id/status — Admin updates user status
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Users"],
    }),

    // DELETE /users/:id — Admin deletes user
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
  useGetPendingUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useApproveUserMutation,
  useRejectUserMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = userApi;
