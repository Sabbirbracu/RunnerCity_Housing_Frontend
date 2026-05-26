import { baseApi } from "./baseApi";

export const financeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Finance Dashboard
    getFinanceSummary: builder.query({
      query: (month) => `/finance/summary${month ? `?month=${month}` : ""}`,
      providesTags: ["Fees", "Expenses"],
    }),
    getFinanceOverview: builder.query({
      query: () => "/finance/overview",
      providesTags: ["Fees", "Expenses"],
    }),
    getDefaulters: builder.query({
      query: () => {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        return `/finance/defaulters?month=${month}`;
      },
      providesTags: ["Fees"],
    }),

    // Fees
    getFees: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.month) searchParams.append("month", params.month);
        if (params?.status) searchParams.append("status", params.status);
        if (params?.user_id) searchParams.append("user_id", params.user_id);
        const qs = searchParams.toString();
        return `/fees${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Fees"],
    }),
    generateFees: builder.mutation({
      query: (data) => ({
        url: "/fees/generate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Fees"],
    }),
    recordFeePayment: builder.mutation({
      query: ({ feeId, ...data }) => ({
        url: `/fees/${feeId}/pay`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Fees"],
    }),
    deleteFee: builder.mutation({
      query: (id) => ({
        url: `/fees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Fees"],
    }),

    // Expenses
    getExpenses: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.category) searchParams.append("category", params.category);
        if (params?.month) searchParams.append("month", params.month);
        const qs = searchParams.toString();
        return `/expenses${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Expenses"],
    }),
    getExpenseCategories: builder.query({
      query: () => "/expenses/categories",
    }),
    createExpense: builder.mutation({
      query: (data) => ({
        url: "/expenses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expenses"],
    }),
    updateExpense: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/expenses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),

    // Contributions
    getContributions: builder.query({
      query: () => "/contributions",
      providesTags: ["Contributions"],
    }),
    createContribution: builder.mutation({
      query: (data) => ({
        url: "/contributions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contributions"],
    }),

    // Payroll
    getPayrollAssignments: builder.query({
      query: () => "/payroll/assignments",
      providesTags: ["Payroll"],
    }),
    getPayrollPayments: builder.query({
      query: () => "/payroll/payments",
      providesTags: ["Payroll"],
    }),
    recordPayrollPayment: builder.mutation({
      query: ({ assignmentId, ...data }) => ({
        url: `/payroll/assignments/${assignmentId}/pay`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFinanceSummaryQuery,
  useGetFinanceOverviewQuery,
  useGetDefaultersQuery,
  useGetFeesQuery,
  useGenerateFeesMutation,
  useRecordFeePaymentMutation,
  useDeleteFeeMutation,
  useGetExpensesQuery,
  useGetExpenseCategoriesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetContributionsQuery,
  useCreateContributionMutation,
  useGetPayrollAssignmentsQuery,
  useGetPayrollPaymentsQuery,
  useRecordPayrollPaymentMutation,
} = financeApi;
