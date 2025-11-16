import type { IAdminDashboard } from "@/screens/admin/type";
import { api } from "../baseConfig";

export const adminDashboardStatsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<IAdminDashboard, void>({
      query: () => ({
        url: "/admin/dashboard",
      }),
      providesTags: ["admin", "dashboard"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = adminDashboardStatsSlice;
