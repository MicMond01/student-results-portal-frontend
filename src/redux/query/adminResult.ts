// import { any } from "@/screens/roles/types";
// import type { AnyResolvedKeyframe } from "framer-motion";
import { api } from "../baseConfig";

export const adminCourseSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllResult: builder.query<any, void>({
      query: () => ({
        url: "/admin",
      }),
      providesTags: ["admin", "result"],
    }),
  }),
});

export const { useGetAllResultQuery } = adminCourseSlice;
