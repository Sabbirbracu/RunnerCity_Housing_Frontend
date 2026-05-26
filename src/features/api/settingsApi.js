import { baseApi } from "./baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // User Preferences
    getUserPreferences: builder.query({
      query: (userId) => `/users/${userId}/preferences`,
      providesTags: ["Preferences"],
    }),
    updateUserPreferences: builder.mutation({
      query: ({ userId, ...prefs }) => ({
        url: `/users/${userId}/preferences`,
        method: "PUT",
        body: prefs,
      }),
      invalidatesTags: ["Preferences"],
    }),

    // Change Password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),

    // Avatar Upload
    uploadAvatar: builder.mutation({
      query: ({ userId, file }) => {
        const formData = new FormData();
        formData.append("avatar", file);
        return {
          url: `/users/${userId}/avatar`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Users"],
    }),
    deleteAvatar: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/avatar`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // Community Settings (Admin)
    getCommunitySettings: builder.query({
      query: () => "/settings/community",
      providesTags: ["Community"],
    }),
    updateCommunitySettings: builder.mutation({
      query: (data) => ({
        url: "/settings/community",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Community"],
    }),
    uploadCommunityLogo: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("logo", file);
        return {
          url: "/settings/community/logo",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Community"],
    }),

    // Notification Templates (Admin)
    getNotificationTemplates: builder.query({
      query: () => "/settings/templates",
      providesTags: ["Templates"],
    }),
    updateNotificationTemplate: builder.mutation({
      query: ({ type, ...data }) => ({
        url: `/settings/templates/${type}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserPreferencesQuery,
  useUpdateUserPreferencesMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
  useGetCommunitySettingsQuery,
  useUpdateCommunitySettingsMutation,
  useUploadCommunityLogoMutation,
  useGetNotificationTemplatesQuery,
  useUpdateNotificationTemplateMutation,
} = settingsApi;
