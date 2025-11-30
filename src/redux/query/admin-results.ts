import type { IAdminStdentResults } from "@/screens/admin/results/types";
import { api } from "../baseConfig";

export const adminResultSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createResult: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/admin/results",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["results", "admin"],
    }),
    getAllResults: builder.query<IAdminStdentResults, void>({
      query: () => ({
        url: "/admin/results",
      }),
      providesTags: ["admin", "results"],
    }),
    bulkCreateResults: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/admin/results/bulk`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["admin", "results"],
    }),
    updateResult: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/results/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin", "results"],
    }),

    deleteResult: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/results/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "results"],
    }),
  }),
});

export const {
  useCreateResultMutation,
  useGetAllResultsQuery,
  useBulkCreateResultsMutation,
  useUpdateResultMutation,
  useDeleteResultMutation,
} = adminResultSlice;
