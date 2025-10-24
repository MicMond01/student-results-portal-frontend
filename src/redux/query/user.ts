// import { any } from "@/screens/roles/types";
// import type { AnyResolvedKeyframe } from "framer-motion";
import { api } from "../baseConfig";

export const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllLecturers: builder.query<any, void>({
      query: () => ({
        url: "/admin/users/lecturers",
      }),
      providesTags: ["user", "admin"],
    }),
    getAllStudents: builder.query<any, void>({
      query: () => ({
        url: "/admin/users/students",
      }),
      providesTags: ["admin", "user"],
    }),
    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: "/admin/users",
      }),
      providesTags: ["admin", "user"],
    }),
    createNewUser: builder.mutation<any, any>({
      query: (payload) => ({
        url: "admin/users",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["admin", "user"],
    }),
    getUser: builder.query<any, string>({
      query: (userId) => ({
        url: `admin/${userId}`,
      }),
      providesTags: ["lecturer", "user"],
    }),
    updateUserDetails: builder.mutation<any, any>({
      //TODO: Add type
      query: (id) => ({
        url: `admin/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["admin", "result"],
    }),
    editStudentResult: builder.mutation<any, any>({
      //TODO: Type for upload student result
      query: (id) => ({
        url: `lecturer/results/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["lecturer", "result"],
    }),
    deleteResult: builder.mutation<any, any>({
      //TODO: Type for upload student result
      query: (id) => ({
        url: `lecturer/results/${id}`,
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
  useGetAllResultsUplodedByLecturerQuery,
  useUploadResultForStudentMutation,
  useEditStudentResultMutation,
  useDeleteResultMutation,
} = lecturerSlice;
