import { baseApi } from "../baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (data) => ({
        url: "/api/blog/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),

    getAllBlog: builder.query({
      query: (query) => ({
        url: "/api/blog/all",
        params: query,
      }),
      providesTags: ["blog"],
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/api/blog/${id}`,
      }),
      providesTags: ["blog"],
    }),

    getBlogBySlug: builder.query({
      query: (slug) => ({
        url: `/api/blog/slug/${slug}`,
      }),
      providesTags: ["blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/blog/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogBySlugQuery,
} = blogApi;
