import type { IStudentDataRoot } from "@/types/lecturer";
import { api } from "../baseConfig";
import type { IStudentResultWithProfile } from "@/screens/lecturer-screens/lecturer-students/types";

export const lecturerResultsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllResultsForLecturerCourses: builder.query<IStudentDataRoot, void>({
      //Done
      query: () => ({
        url: "/lecturer/results/course-results",
      }),
      providesTags: ["lecturer", "result"],
    }),
    getAllResultsUplodedByLecturer: builder.query<any, void>({
      query: () => ({
        url: "/lecturer/results",
      }),
      providesTags: ["lecturer", "result"],
    }),
    uploadResultForStudent: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/lecturer/results",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["lecturer", "result"],
    }),
    bulkCreateResults: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/lecturer/results/bulk`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["lecturer", "results"],
    }),
    getStudentsResultsTemplate: builder.query<Blob, string>({
      query: (format) => {
        const clean = format.trim().toLowerCase();
        return {
          url: `/lecturer/results/template/${clean}`,
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
    getResultWithStudentInfo: builder.query<IStudentResultWithProfile, any>({
      query: (id) => ({
        url: `/lecturer/results/${id}`,
      }),
      providesTags: ["lecturer", "result"],
    }),
    editStudentResult: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/lecturer/results/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["lecturer", "result"],
    }),
    deleteResult: builder.mutation<any, any>({
      query: (id) => ({
        url: `/lecturer/results/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lecturer", "result"],
    }),
  }),
});

export const {
  useGetAllResultsForLecturerCoursesQuery,
  useBulkCreateResultsMutation,
  useLazyGetStudentsResultsTemplateQuery,
  useGetStudentsResultsTemplateQuery,
  useGetAllResultsUplodedByLecturerQuery,
  useUploadResultForStudentMutation,
  useEditStudentResultMutation,
  useGetResultWithStudentInfoQuery,
  useDeleteResultMutation,
} = lecturerResultsSlice;
