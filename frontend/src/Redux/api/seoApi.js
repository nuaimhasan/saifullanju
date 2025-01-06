import { baseApi } from "./baseApi";

export const seoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSEO: builder.mutation({
      query: (data) => ({
        url: `/api/seo/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seo"],
    }),

    getSEO: builder.query({
      query: () => ({
        url: "/api/seo",
      }),
      providesTags: ["seo"],
    }),

    updateSEO: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/seo/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["seo"],
    }),
  }),
});

export const { useAddSEOMutation, useGetSEOQuery, useUpdateSEOMutation } =
  seoApi;
