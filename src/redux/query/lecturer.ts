// import { any } from "@/screens/roles/types";
// import type { AnyResolvedKeyframe } from "framer-motion";
import type {
  ILecturerAnalyticsRoot,
  ILecturerCourses,
  IStudentDataRoot,
  PasswordFormData,
} from "@/types/lecturer";
import { api } from "../baseConfig";
import type { IStudentResultWithProfile } from "@/screens/lecturer-students/types";
import type { ILecturerProfile } from "@/screens/lecturer-profile/type";

export const lecturerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getLecturerProfile: builder.query<ILecturerProfile, void>({//Done 
      query: () => ({
        url: "/lecturer/profile",
      }),
      providesTags: ["lecturer"],
    }),
    updateLecturerProfile: builder.mutation<any, any>({ //Done 
      query: (payload) => ({
        url: "/lecturer/profile",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["lecturer"],
    }),
    getCoursesAssignedToLecturer: builder.query<ILecturerCourses, void>({
      query: () => ({
        url: "/lecturer/courses",
      }),
      providesTags: ["lecturer", "courses"],
    }),
    getAllResultsForLecturerCourses: builder.query<IStudentDataRoot, void>({//Done 
      query: () => ({
        url: "/lecturer/course-results",
      }),
      providesTags: ["lecturer", "result"],
    }),
    getLecturerCoursesAnalytics: builder.query<ILecturerAnalyticsRoot, void>({//Done 
      query: () => ({
        url: "/lecturer/analytics",
      }),
      providesTags: ["lecturer", "result"],
    }),
    getAllResultsUplodedByLecturer: builder.query<any, void>({
      query: () => ({
        url: "/lecturer/results",
      }),
      providesTags: ["lecturer", "result"],
    }),
    uploadResultForStudent: builder.mutation<any, any>({//Done 
      //TODO: Type for upload student result
      query: (payload) => ({
        url: "/lecturer/results",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["lecturer", "result"],
    }),
    getResultWithStudentInfo: builder.query<IStudentResultWithProfile, any>({//Done 
      //TODO: Type for upload student result
      query: (id) => ({
        url: `/lecturer/results/${id}`,
      }),
      providesTags: ["lecturer", "result"],
    }),
    editStudentResult: builder.mutation<any, any>({//Done 
      //TODO: Type for upload student result
      query: ({ id, data }) => ({
        url: `/lecturer/results/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["lecturer", "result"],
    }),
    updateProfilePhoto: builder.mutation<any, { profilePhoto: string }>({
      query: (data) => ({
        url: "/lecturer/profile/photo",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["lecturer"],
    }), //

    changePassword: builder.mutation<any, PasswordFormData>({//Done 
      query: (data) => ({
        url: "/lecturer/profile/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteResult: builder.mutation<any, any>({//Done 
      //TODO: Type for upload student result
      query: (id) => ({
        url: `/lecturer/results/${id}`,
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
  useGetLecturerCoursesAnalyticsQuery,
  useGetAllResultsUplodedByLecturerQuery,
  useUpdateProfilePhotoMutation,
  useChangePasswordMutation,
  useUploadResultForStudentMutation,
  useEditStudentResultMutation,
  useGetResultWithStudentInfoQuery,
  useDeleteResultMutation,
} = lecturerSlice;
