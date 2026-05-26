import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API slice
export const baseApi = createApi({
  reducerPath: "baseapi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Users", "Plots", "Fees", "Payroll", "Contributions", "Expenses", "Preferences", "Community", "Templates"],
  endpoints: () => ({}),
});
