import type {
  IAdminLecturerResults,
  IAdminStdentResults,
  IAdminStudentResult,
} from "@/screens/admin/results/student-results/types";
import { api } from "../baseConfig";
import type { IAdminCourseResults } from "@/screens/admin/results/course-results/types";

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
    getStudentsResultsTemplate: builder.query<Blob, string>({
      query: (format) => {
        const clean = format.trim().toLowerCase();
        return {
          url: `/admin/results/template/${clean}`,
          responseHandler: async (response: any) => {
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Failed to download");
            }
            return response.blob();
          },
        };
      },
      keepUnusedDataFor: 0,
    }),
    studentResults: builder.query<IAdminStudentResult, any>({
      query: (studentId) => ({
        url: `/admin/results/student/${studentId}`,
      }),
      providesTags: ["admin", "results"],
    }),
    lecturerResults: builder.query<IAdminLecturerResults, string>({
      query: (lecturerId) => ({
        url: `/admin/results/lecturer/${lecturerId}`,
      }),
      providesTags: ["admin", "results", "lecturer"],
    }),
    courseResults: builder.query<IAdminCourseResults, any>({
      query: (courseId) => ({
        url: `/admin/results/course/${courseId}`,
      }),
      providesTags: ["admin", "results", "course"],
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
  useGetStudentsResultsTemplateQuery,
  useLazyGetStudentsResultsTemplateQuery,
  useBulkCreateResultsMutation,
  useStudentResultsQuery,
  useLecturerResultsQuery,
  useCourseResultsQuery,
  useUpdateResultMutation,
  useDeleteResultMutation,
} = adminResultSlice;
