import { api } from "../baseConfig";

export const adminLecturerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createLecturer: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/admin/lecturers",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["lecturers", "admin"],
    }),
    getAllLecturers: builder.query<any, void>({
      query: () => ({
        url: "/admin/lecturers",
      }),
      providesTags: ["admin", "lecturers"],
    }),
    getLecturersByDepartment: builder.query<any, any>({
      query: (deptId) => ({
        url: `/admin/lecturers/department/${deptId}`,
      }),
      providesTags: ["admin", "lecturers"],
    }),
    updateLecturer: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/lecturers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin", "lecturers"],
    }),

    deleteLecturer: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/lecturers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "lecturers"],
    }),
  }),
});

export const {
  useCreateLecturerMutation,
  useGetAllLecturersQuery,
  useGetLecturersByDepartmentQuery,
  useUpdateLecturerMutation,
  useDeleteLecturerMutation,
} = adminLecturerSlice;
