// import { IUser } from "@/screens/users/types";
import { api } from "../baseConfig";
import { z } from "zod";
// import { registrationSchema } from "@/screens/Authentication/complete-registration";

interface AuthResponse {
  token: string;
}

export const authenticationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query<any, void>({
      query: () => ({
        url: "/v2/myinfo",
      }),
      providesTags: ["users"],
    }),
    getTestRoute: builder.query<any, void>({
      query: () => ({
        url: "/test",
      }),
      providesTags: ["users"],
    }),

    // registration: builder.mutation<any, z.infer<typeof registrationSchema>>({
    //   query: (payload) => ({
    //     url: "/v2/registration",
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["user"],
    // }),
    login: builder.mutation<
      AuthResponse,
      { email: string; password: string; unlockScreen?: boolean }
    >({
      query: (payload) => ({
        url: "/v1/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetTestRouteQuery,
  useLoginMutation,
  useGetLoggedInUserQuery,
  useLazyGetLoggedInUserQuery,
} = authenticationSlice;
