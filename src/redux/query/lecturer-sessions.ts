// import { any } from "@/screens/roles/types";
// import type { AnyResolvedKeyframe } from "framer-motion";
import type { IAdminSessions } from "@/screens/admin/sessions/type";
import { api } from "../baseConfig";

export const lecturerSessiosSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSessions: builder.query<IAdminSessions, void>({
      query: () => ({
        url: "/lecturer/academic-sessions",
      }),
      providesTags: ["sessions", "lecturer"],
    }),
    getCurrentAcademicSession: builder.query<any, void>({
      query: () => ({
        url: `/lecturer/academic-sessions/current`,
      }),
      providesTags: ["lecturer", "sessions"],
    }),
  }),
});

export const {
  useGetAllAcademicSessionsQuery,
  useLazyGetAllAcademicSessionsQuery,
  useGetCurrentAcademicSessionQuery,
} = lecturerSessiosSlice;
