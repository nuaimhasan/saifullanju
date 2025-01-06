import { baseApi } from "./baseApi";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: "/api/about",
      }),
      providesTags: ["about"],
    }),
    updateAbout: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/about/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["about"],
    }),
    addAbout: builder.mutation({
      query: (formData) => ({
        url: `/api/about/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const { useGetAboutQuery, useUpdateAboutMutation, useAddAboutMutation } =
  aboutApi;
