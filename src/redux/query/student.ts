import type { IStudentProfile } from "@/types/student";
import { api } from "../baseConfig";
import type { IStudentResunts } from "@/screens/students-screens/results/type";

export const studentSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyResults: builder.query<IStudentResunts, void>({
      query: () => ({
        url: "/student/results",
      }),
      providesTags: ["student"],
    }),
    getMyCourses: builder.query<any, void>({
      query: () => ({
        url: "/student/courses",
      }),
      providesTags: ["student", "course"],
    }),
    getOwnProfile: builder.query<IStudentProfile, void>({
      query: () => ({
        url: "/student/profile",
      }),
      providesTags: ["student"],
    }),
    updateOwnProfile: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/student/profile",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["student"],
    }),
  }),
});

export const {
  useGetMyCoursesQuery,
  useGetMyResultsQuery,
  useGetOwnProfileQuery,
  useUpdateOwnProfileMutation,
} = studentSlice;
