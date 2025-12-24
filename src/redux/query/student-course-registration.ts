import type { IStudentRegisteredCourses, IStudentUnregisteredCourses } from "@/screens/students-screens/courses/type";
import { api } from "../baseConfig";

export const studentCourseRegistrationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    registerForCourse: builder.mutation<any, any>({
      query: (courseId) => ({
        url: `student/course-registration/register`,
        method: "POST",
        body: courseId,
      }),
      invalidatesTags: ["courses", "courseRegistration"],
    }),
    unregisterFromCourse: builder.mutation<any, any>({
      query: ({ courseId, studentId }) => ({
        url: `student/course-registration/unregister/${courseId}`,
        method: "POST",
        body: studentId,
      }),
      invalidatesTags: ["courses", "courseRegistration"],
    }),
    getAvailableCourses: builder.query<IStudentUnregisteredCourses, void>({
      query: () => ({
        url: `student/course-registration/available`,
      }),
      providesTags: ["courses", "courseRegistration"],
    }),
    getMyRegisteredCourses: builder.query<IStudentRegisteredCourses, void>({
      query: () => ({
        url: `student/course-registration/my-courses`,
      }),
      providesTags: ["courses", "courseRegistration"],
    }),
  }),
});

export const {
  useRegisterForCourseMutation,
  useUnregisterFromCourseMutation,
  useGetAvailableCoursesQuery,
  useGetMyRegisteredCoursesQuery,
} = studentCourseRegistrationSlice;
