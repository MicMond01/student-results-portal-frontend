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
  return response;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,

  reducerPath: "apiPath",
  tagTypes: [
    "user",
    "lecturer",
    "courses",
    "result",
    "admin",
    "course",
    "result",
    "student",
  ],
  endpoints: (_builder) => ({}),
});
