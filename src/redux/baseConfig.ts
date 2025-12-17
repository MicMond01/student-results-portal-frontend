import {
  type BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import { exitUser } from "./slices/auth";
import { toast } from "sonner";

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

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const { status, data } = result.error;
    const errorMessage =
      (data as { message?: string; msg?: string })?.message ||
      (data as { message?: string; msg?: string })?.msg ||
      "An error occurred";

    switch (status) {
      case 401:
        // Authentication error - logout
        toast.error("Session expired. Please login again.");
        api.dispatch(exitUser());
        window.location.href = "/login";
        break;

      case 403:
        // Authorization error - show message but DON'T logout
        if (
          errorMessage.includes("closed") ||
          errorMessage.includes("session")
        ) {
          toast.warning(errorMessage, { duration: 5 });
        } else {
          toast.error(errorMessage);
        }
        break;

      case 404:
        toast.error(errorMessage);
        break;

      case 500:
        toast.error("Server error. Please try again later.");
        break;

      default:
        // Other errors
        if (status !== 200) {
          toast.error(errorMessage);
        }
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
