// import { IUser } from "@/screens/users/types";
import { api } from "../baseConfig";
import { setUser } from "../slices/auth";
// import { z } from "zod";
// import { registrationSchema } from "@/screens/Authentication/complete-registration";

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface AuthUser {
  name: string;
  role: string;
}

export interface LoggedInUser {
  user: IUser;
}

export interface IUser {
  id: string;
  name: string;
  identifier: string;
  role: string;
  createdAt: string;
}

export const authenticationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query<LoggedInUser, void>({
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
    login: builder.mutation<
      AuthResponse,
      { identifier: string; password: string }
    >({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetLoggedInUserQuery,
  useLazyGetLoggedInUserQuery,
} = authenticationSlice;
