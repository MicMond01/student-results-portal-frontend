import type {
  ILecturerAnalyticsRoot,
  ILecturerCourses,
} from "@/types/lecturer";
import { api } from "../baseConfig";
import type { ILecturerCourseDetails } from "@/screens/lecturer-screens/lecturer-course/course-details/types";

export const lecturerCoursesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAssignedToLecturer: builder.query<ILecturerCourses, void>({
      query: () => ({
        url: "/lecturer/courses",
      }),
      providesTags: ["lecturer", "courses"],
    }),
    getLecturerCoursesAnalytics: builder.query<ILecturerAnalyticsRoot, void>({
      query: () => ({
        url: "/lecturer/courses/analytics",
      }),
      providesTags: ["lecturer", "result"],
    }),
    getCourseDetails: builder.query<ILecturerCourseDetails, string>({
      query: (id) => ({
        url: `/lecturer/courses/${id}`,
      }),
      providesTags: ["lecturer", "result"],
    }),
  }),
});

export const {
  useGetCoursesAssignedToLecturerQuery,
  useGetCourseDetailsQuery,
  useGetLecturerCoursesAnalyticsQuery,
} = lecturerCoursesSlice;
