import { api } from "../baseConfig";

export const adminDepartmentSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/admin/departments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["department", "admin"],
    }),
    getAllDepartments: builder.query<any, void>({
      query: () => ({
        url: "/admin/departments",
      }),
      providesTags: ["admin", "department"],
    }),
    getDepartment: builder.query<any, any>({
      query: (id) => ({
        url: `/admin/departments/${id}`,
      }),
      providesTags: ["admin", "department"],
    }),
    updateADepartment: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/departments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin", "department"],
    }),

    deleteDepartment: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "department"],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useLazyGetAllDepartmentsQuery,
  useGetAllDepartmentsQuery,
  useGetDepartmentQuery,
  useUpdateADepartmentMutation,
  useDeleteDepartmentMutation,
} = adminDepartmentSlice;
