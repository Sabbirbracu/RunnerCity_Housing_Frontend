// src/redux/services/prayerApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const prayerApi = createApi({
  reducerPath: "prayerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.aladhan.com/v1" }),
  endpoints: (builder) => ({
    getPrayerByCoordinates: builder.query({
      query: ({ latitude, longitude }) =>
        `/timings?latitude=${latitude}&longitude=${longitude}&method=2`,
    }),
  }),
});

export const { useGetPrayerByCoordinatesQuery } = prayerApi;
