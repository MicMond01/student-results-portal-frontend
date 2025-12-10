import type { AdminCourses, IAdminDepartmentCourse } from "@/screens/admin/courses/type";
import { api } from "../baseConfig";

export const adminCourseSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/admin/courses",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["course", "admin"],
    }),
    getAllCourses: builder.query<AdminCourses, void>({
      // used
      query: () => ({
        url: "/admin/courses",
      }),
      providesTags: ["admin", "course"],
    }),
    getCoursesByDepartment: builder.query<IAdminDepartmentCourse, string>({
      query: (deptId) => ({
        url: `/admin/courses/department/${deptId}`,
      }),
      providesTags: ["admin", "course"],
    }),
    updateACourse: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin", "course"],
    }),

    deleteCourse: builder.mutation<any, string>({
      //used
      query: (id) => ({
        url: `/admin/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetCoursesByDepartmentQuery,
  useUpdateACourseMutation,
  useDeleteCourseMutation,
} = adminCourseSlice;
