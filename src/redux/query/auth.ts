// import { IUser } from "@/screens/users/types";
import { api } from "../baseConfig";
import { z } from "zod";
// import { registrationSchema } from "@/screens/Authentication/complete-registration";

export interface AuthResponse {
  user: TUser;
  token: string;
}

export interface TUser {
  name: string;
  role: string;
}

export const authenticationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query<any, void>({
      query: () => ({
        url: "/v2/myinfo",
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
      { identifier: string; password: string }
    >({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetLoggedInUserQuery,
  useLazyGetLoggedInUserQuery,
} = authenticationSlice;
