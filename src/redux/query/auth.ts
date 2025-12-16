// import { IUser } from "@/screens/users/types";
import { api } from "../baseConfig";
import { setUser } from "../slices/auth";
// import { z } from "zod";
// import { registrationSchema } from "@/screens/Authentication/complete-registration";

export interface AuthResponse {
  success: boolean;
  token: string;
  user: AuthUser;
  nextStep: string;
  requiresVerification: boolean;
  requiresPasswordChange: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  identifier: string;
  role: string;
  accountStatus: string;
}

export interface AuthVerificationForm {
  dateOfBirth: string;
  phone: string;
  jambNo?: string;
  staffId?: string;
}

export interface AuthVerificationFormResponse {
  success: boolean;
  message: string;
  nextStep: string;
  requiresPasswordChange: boolean;
}

export interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface ChangePasswordFormProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface LoginFormData {
  identifier: string;
  password: string;
}

export const authenticationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/auth/myinfo",
      }),
      providesTags: ["user"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.user) {
            dispatch(setUser(data.user));
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      },
    }),

    // registration: builder.mutation<any, z.infer<typeof registrationSchema>>({
    //   query: (payload) => ({
    //     url: "/auth/registration",
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["user"],
    // }),
    login: builder.mutation<AuthResponse, LoginFormData>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    verifyIdentity: builder.mutation<
      AuthVerificationFormResponse,
      AuthVerificationForm
    >({
      query: (payload) => ({
        url: "/auth/verify-identity",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation<any, ChangePasswordFormProps>({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyIdentityMutation,
  useChangePasswordMutation,
  useGetLoggedInUserQuery,
  useLazyGetLoggedInUserQuery,
} = authenticationSlice;
