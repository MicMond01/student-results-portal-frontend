import type { IAdminExams } from "@/screens/admin/exams/types";
import { api } from "../baseConfig";

export const adminExamsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createResult: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/admin/results",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["results", "admin"],
    }),
    getAllExams: builder.query<IAdminExams, void>({
      query: () => ({
        url: "/admin/exams",
      }),
      providesTags: ["admin", "exam"],
    }),
    updateAnExam: builder.mutation<any, any>({
      query: ({ examId, data }) => ({
        url: `/admin/exams/${examId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin", "exam"],
    }),
    delateExam: builder.mutation<any, string>({
      query: (id) => ({
        url: `/admin/exams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "exam"],
    }),
  }),
});

export const {
  useCreateResultMutation,
  useGetAllExamsQuery,
  useUpdateAnExamMutation,
  useDelateExamMutation,
} = adminExamsSlice;
