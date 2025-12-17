import { api } from "../baseConfig";

export const adminCourseRegistrationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateRegistrationSettings: builder.mutation({
      query: ({ courseId, settings }) => ({
        url: `admin/course-registration/${courseId}/settings`,
        method: "PATCH",
        body: settings,
      }),
      invalidatesTags: ["courses", "courseRegistration"],
    }),

    closeRegistration: builder.mutation({
      query: (courseId) => ({
        url: `admin/course-registration/${courseId}/close`,
        method: "PATCH",
      }),
      invalidatesTags: ["courses", "courseRegistration"],
    }),

    openRegistration: builder.mutation({
      query: (courseId) => ({
        url: `admin/course-registration/${courseId}/open`,
        method: "PATCH",
      }),
      invalidatesTags: ["courses", "courseRegistration"],
    }),
    bulkSetDeadlineForDepartment: builder.mutation({
      query: ({ departmentId, deadline }) => ({
        url: `admin/course-registration/deadline/${departmentId}`,
        method: "PATCH",
        body: deadline,
      }),
      invalidatesTags: ["courses", "courseRegistration"],
    }),
    setDeadlineForSession: builder.mutation({
      query: ({ sessionId, deadline }) => ({
        url: `admin/course-registration/deadline/${sessionId}`,
        method: "PATCH",
        body: deadline,
      }),
      invalidatesTags: ["courses", "courseRegistration"],
    }),
    getRegistrationStatistics: builder.query<any, any>({
      query: () => ({
        url: `admin/course-registration/statistics`,
      }),
      providesTags: ["courses", "courseRegistration"],
    }),
  }),
});

export const {
    
} = adminCourseRegistrationSlice;
