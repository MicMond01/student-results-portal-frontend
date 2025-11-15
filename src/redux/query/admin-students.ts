import { api } from "../baseConfig";

export const adminStudentsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/admin/students",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["students", "admin"],
    }),
    getAllStudents: builder.query<any, void>({
      query: () => ({
        url: "/admin/students",
      }),
      providesTags: ["admin", "students"],
    }),
    bulkCreateStudents: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/admin/students/bulk`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["admin", "students"],
    }),
    getStudentsByDepartment: builder.query<any, any>({
      query: (deptId) => ({
        url: `/admin/students/department/${deptId}`,
      }),
      providesTags: ["admin", "students"],
    }),
    updateStudent: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/students/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin", "students"],
    }),

    deleteStudent: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "students"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useBulkCreateStudentsMutation,
  useGetStudentsByDepartmentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = adminStudentsSlice;
