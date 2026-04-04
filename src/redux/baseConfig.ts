import {
  type BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import { exitUser } from "./slices/auth";

export const base_url = import.meta.env.VITE_API_BASE_URL

const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
  prepareHeaders: (headers, { getState }) => {
    const rec = getState() as unknown as RootState;
    if (rec.auth.token)
      headers.set("Authorization", `Bearer ${rec.auth.token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const { status } = result.error;

    // Only do LOGIC here — no toast, no redirect
    if (status === 401) {
      api.dispatch(exitUser());
    }

    // Important: explicitly pass 429 through
    if (status === 429) {
      return {
        error: {
          status: 429,
          data: result.error.data,
        },
      };
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,

  reducerPath: "apiPath",
  tagTypes: [
    "user",
    "lecturer",
    "courses",
    "courseRegistration",
    "result",
    "admin",
    "course",
    "result",
    "student",
    "exam",
    "sessions",
    "department",
    "lecturers",
    "results",
    "students",
    "dashboard",
    "transcript",
  ],
  endpoints: (_builder) => ({}),
});
