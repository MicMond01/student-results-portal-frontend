import type { PasswordFormData } from "@/types/lecturer";
import { api } from "../baseConfig";
import type { ILecturerProfile } from "@/screens/lecturer-screens/lecturer-profile/type";

export const lecturerProfileSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getLecturerProfile: builder.query<ILecturerProfile, void>({
      //Done
      query: () => ({
        url: "/lecturer/profile",
      }),
      providesTags: ["lecturer"],
    }),
    updateLecturerProfile: builder.mutation<any, any>({
      //Done
      query: (payload) => ({
        url: "/lecturer/profile",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["lecturer"],
    }),
    changePassword: builder.mutation<any, PasswordFormData>({
      //Done
      query: (data) => ({
        url: "/lecturer/profile/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    updateProfilePhoto: builder.mutation<any, { profilePhoto: string }>({
      query: (data) => ({
        url: "/lecturer/profile/photo",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["lecturer"],
    }),
  }),
});

export const {
  useGetLecturerProfileQuery,
  useUpdateLecturerProfileMutation,
  useChangePasswordMutation,
  useUpdateProfilePhotoMutation,
} = lecturerProfileSlice;
