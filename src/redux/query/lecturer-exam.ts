import { api } from "../baseConfig";

export const lecturerExamSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query<any, void>({
      query: () => ({
        url: "/lecturer/exams",
      }),
      providesTags: ["lecturer", "exam"],
    }),
    createExam: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/lecturer/exams",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["lecturer", "exam"],
    }),
    getExam: builder.query<any, void>({
      query: (id) => ({
        url: `/lecturer/exams/${id}`,
      }),
      providesTags: ["lecturer", "exam"],
    }),
    updateExam: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/lecturer/exams/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["lecturer", "exam"],
    }),
    deleteExam: builder.mutation<any, void>({
      query: (id) => ({
        url: `/lecturer/exams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lecturer", "exam"],
    }),
    addQuestionTOExam: builder.mutation<any, any>({
      query: (id) => ({
        url: `/lecturer/exams/${id}/questions`,
        method: "POST",
      }),
      invalidatesTags: ["lecturer", "exam"],
    }),
    updateExamQuestion: builder.mutation<
      any,
      { examId: string; questionId: string; data: any }
    >({
      query: ({ examId, questionId, data }) => ({
        url: `/lecturer/exams/${examId}/questions/${questionId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["lecturer", "exam"],
    }),

    deleteQuestionFromExam: builder.mutation<
      any,
      { examId: string; questionId: string }
    >({
      query: ({ examId, questionId }) => ({
        url: `/lecturer/exams/${examId}/questions/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lecturer", "exam"],
    }),
    getExamsByCourse: builder.query<any, any>({
      query: (id) => ({
        url: `/lecturer/results/${id}`,
      }),
      providesTags: ["lecturer", "exam"],
    }),
  }),
});

export const {
  useGetExamsQuery,
  useCreateExamMutation,
  useGetExamQuery,
  useUpdateExamMutation,
  useDeleteExamMutation,
  useAddQuestionTOExamMutation,
  useUpdateExamQuestionMutation,
  useDeleteQuestionFromExamMutation,
  useGetExamsByCourseQuery,
} = lecturerExamSlice;
