// import { any } from "@/screens/roles/types";
// import type { AnyResolvedKeyframe } from "framer-motion";
import type { IAdminSessions } from "@/screens/admin/sessions/type";
import { api } from "../baseConfig";

export const adminSessiosSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSessions: builder.query<IAdminSessions, void>({
      query: () => ({
        url: "/admin/sessions",
      }),
      providesTags: ["sessions", "admin"],
    }),
    createAcademicSession: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/admin/sessions",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["sessions", "admin"],
    }),
    getCurrentAcademicSession: builder.query<any, void>({
      query: () => ({
        url: `/admin/sessions/current`,
      }),
      providesTags: ["admin", "sessions"],
    }),
    updateAcademicSession: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/sessions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin", "sessions"],
    }),

    deleteAcademicSession: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/sessions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "sessions"],
    }),
  }),
});

export const {
  useGetAllAcademicSessionsQuery,
  useLazyGetAllAcademicSessionsQuery,
  useCreateAcademicSessionMutation,
  useGetCurrentAcademicSessionQuery,
  useUpdateAcademicSessionMutation,
  useDeleteAcademicSessionMutation,
} = adminSessiosSlice;
