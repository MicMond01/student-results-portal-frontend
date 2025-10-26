// import { any } from "@/screens/roles/types";
// import type { AnyResolvedKeyframe } from "framer-motion";
import type {
  ILecturerAnalyticsRoot,
  IStudentDataRoot,
} from "@/types/lecturer";
import { api } from "../baseConfig";

export const lecturerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getLecturerProfile: builder.query<any, void>({
      query: () => ({
        url: "/lecturer/profile",
      }),
      providesTags: ["lecturer"],
    }),
    updateLecturerProfile: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/lecturer/profile",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["lecturer"],
    }),
    getCoursesAssignedToLecturer: builder.query<any, void>({
      query: () => ({
        url: "/lecturer/courses",
      }),
      providesTags: ["lecturer", "courses"],
    }),
    getAllResultsForLecturerCourses: builder.query<IStudentDataRoot, void>({
      query: () => ({
        url: "/lecturer/results/my-course",
      }),
      providesTags: ["lecturer", "result"],
    }),
    getLecturerCoursesAnalytics: builder.query<ILecturerAnalyticsRoot, void>({
      query: () => ({
        url: "/lecturer/analytics",
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
      //TODO: Type for upload student result
      query: () => ({
        url: "/lecturer/results",
        method: "POST",
      }),
      invalidatesTags: ["lecturer", "result"],
    }),
    editStudentResult: builder.mutation<any, any>({
      //TODO: Type for upload student result
      query: (id) => ({
        url: `/lecturer/results/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["lecturer", "result"],
    }),
    deleteResult: builder.mutation<any, any>({
      //TODO: Type for upload student result
      query: (id) => ({
        url: `/lecturer/results/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lecturer", "result"],
    }),
  }),
});

export const {
  useGetLecturerProfileQuery,
  useUpdateLecturerProfileMutation,
  useGetCoursesAssignedToLecturerQuery,
  useGetAllResultsForLecturerCoursesQuery,
  useGetLecturerCoursesAnalyticsQuery,
  useGetAllResultsUplodedByLecturerQuery,
  useUploadResultForStudentMutation,
  useEditStudentResultMutation,
  useDeleteResultMutation,
} = lecturerSlice;
