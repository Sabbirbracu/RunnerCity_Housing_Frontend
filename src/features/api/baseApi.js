import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API slice
export const baseApi = createApi({
  reducerPath: "baseapi", // global key for this api slice
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", // replace with your backend URL
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Auth"], // optional caching tags
  endpoints: () => ({}), // no endpoints here yet
});
