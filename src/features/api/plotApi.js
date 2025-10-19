// src/features/api/plotApi.js
import { baseApi } from "./baseApi";

export const plotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🟢 GET all plots
    getPlots: builder.query({
      query: () => ({
        url: "/plots",
        method: "GET",
      }),
      providesTags: ["Plots"],
    }),

    // 🟠 CREATE a new plot
    createPlot: builder.mutation({
      query: (newPlot) => ({
        url: "/plots",
        method: "POST",
        body: newPlot,
      }),
      invalidatesTags: ["Plots"],
    }),

    // 🟡 UPDATE a plot by plot_no
    updatePlot: builder.mutation({
      query: ({ plot_no, ...updatedFields }) => ({
        url: `/plots/${plot_no}`,
        method: "PUT",
        body: updatedFields,
      }),
      invalidatesTags: ["Plots"],
    }),

    // 🔴 DELETE a plot by plot_no
    deletePlot: builder.mutation({
      query: (plot_no) => ({
        url: `/plots/${plot_no}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Plots"],
    }),
  }),
  overrideExisting: false,
});

// ✅ Export hooks
export const {
  useGetPlotsQuery,
  useCreatePlotMutation,
  useDeletePlotMutation,
  useUpdatePlotMutation,
} = plotApi;
