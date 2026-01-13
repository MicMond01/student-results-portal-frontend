// import { any } from "@/screens/roles/types";
// import type { AnyResolvedKeyframe } from "framer-motion";
import type { IAdminSessions } from "@/screens/admin/sessions/type";
import { api } from "../baseConfig";

export const adminSessiosSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSessions: builder.query<IAdminSessions, void>({
      query: () => ({
        url: "/student/academic-sessions",
      }),
      providesTags: ["sessions", "student"],
    }),
    getCurrentAcademicSession: builder.query<any, void>({
      query: () => ({
        url: `/student/academic-sessions/current`,
      }),
      providesTags: ["student", "sessions"],
    }),
  }),
});

export const {
  useGetAllAcademicSessionsQuery,
  useLazyGetAllAcademicSessionsQuery,
  useGetCurrentAcademicSessionQuery,
} = adminSessiosSlice;
