// import { any } from "@/screens/roles/types";
// import type { AnyResolvedKeyframe } from "framer-motion";
import { api } from "../baseConfig";

export const adminCourseSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewCourse: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/admin",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["course", "admin"],
    }),
    listAllCourses: builder.query<any, void>({
      query: () => ({
        url: "/admin",
      }),
      providesTags: ["admin", "course"],
    }),
    getCourse: builder.query<any, void>({
      query: (id) => ({
        url: `/admin/${id}`,
      }),
      providesTags: ["admin", "course"],
    }),
    updateACourse: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin", "course"],
    }),

    deleteCourse: builder.mutation<any, any>({
      //TODO: Type for upload student result
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "course"],
    }),
  }),
});

export const {
  useAddNewCourseMutation,
  useListAllCoursesQuery,
  useGetCourseQuery,
  useUpdateACourseMutation,
  useDeleteCourseMutation,
} = adminCourseSlice;
