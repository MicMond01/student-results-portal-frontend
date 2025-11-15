import { api } from "../baseConfig";

export const adminDashboardStatsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<any, void>({
      query: () => ({
        url: "/admin/dashboard",
      }),
      providesTags: ["admin", "dashboard"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = adminDashboardStatsSlice;
