import type {
  IAdminStudentData,
  IAdminStudents,
} from "@/screens/admin/students/types";
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
    getAllStudents: builder.query<IAdminStudents, void>({
      query: () => ({
        url: "/admin/students",
      }),
      providesTags: ["admin", "students"],
    }),
    getStudent: builder.query<IAdminStudentData, any>({
      query: (id) => ({
        url: `/admin/students/${id}`,
      }),
      providesTags: ["admin", "students"],
    }),
    getDownloadUploadStudentsTemplate: builder.query<Blob, string>({
      query: (format) => {
        const clean = format.trim().toLowerCase();
        console.log(clean);
        return {
          url: `/admin/students/template/${clean}`,
          responseHandler: async (response: any) => {
            if (!response.ok) {
              const errorData = await response.json(); // ← Fixed: Parse as JSON, not text/blob
              throw new Error(errorData.message || "Failed to download");
            }
            return response.blob();
          },
        };
      },
      keepUnusedDataFor: 0,
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
  useGetStudentQuery,
  useGetStudentsByDepartmentQuery,
  useGetDownloadUploadStudentsTemplateQuery,
  useLazyGetDownloadUploadStudentsTemplateQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = adminStudentsSlice;
