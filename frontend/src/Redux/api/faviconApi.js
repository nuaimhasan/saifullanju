import { baseApi } from "./baseApi";

export const faviconApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavicon: builder.query({
      query: () => ({
        url: "/api/favicon/all",
      }),
      providesTags: ["favicon"],
    }),

    addFavicon: builder.mutation({
      query: (formData) => ({
        url: `/api/favicon/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["favicon"],
    }),

    updateFavicon: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/favicon/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["favicon"],
    }),
  }),
});

export const {
  useGetFaviconQuery,
  useAddFaviconMutation,
  useUpdateFaviconMutation,
} = faviconApi;
