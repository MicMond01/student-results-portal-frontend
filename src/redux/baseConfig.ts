import {
  type BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import { exitUser } from "./slices/auth";

export const base_url = import.meta.env.VITE_API_BASE_URL_DEV;

const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
  prepareHeaders: (headers, { getState }) => {
    const rec = getState() as unknown as RootState;
    if (rec.auth.token)
      headers.set("Authorization", `Bearer ${rec.auth.token}`);
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn = async (args, api, extraOptions) => {
  const response = await baseQuery(args, api, extraOptions);
  if (response.error?.status === 403) {
    api.dispatch(exitUser());
    return response;
  }
  if (response.error?.status === 401) {
    const res = response.error.data as { screen?: boolean };
    const state = api.getState() as RootState;
    const loginTime = state.auth.time;
    if (!loginTime) {
      api.dispatch(exitUser());
      return response;
    }
    const currentTime = Date.now();
    const threeMinutesAgo = currentTime - 3 * 60 * 1000;
    if (loginTime > threeMinutesAgo) {
      if (!res.screen) api.dispatch(exitUser());
    }
    return response;
  } else return response;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,

  reducerPath: "apiPath",
  tagTypes: ["users"],
  endpoints: (_builder) => ({}),
});
