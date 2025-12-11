import { api } from "../baseConfig";

export const adminTranscriptSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicTranscript: builder.query<any, string>({
      query: (studentId) => ({
        url: `/admin/transcript/${studentId}`,
      }),
      providesTags: ["transcript", "admin"],
    }),
  }),
});

export const {
  useGetAcademicTranscriptQuery,
  useLazyGetAcademicTranscriptQuery,
} = adminTranscriptSlice;
