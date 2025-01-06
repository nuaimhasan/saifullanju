import { baseApi } from "../baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (formData) => ({
        url: "/api/book/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["book"],
    }),

    getAllBook: builder.query({
      query: (query) => ({
        url: "/api/book/all",
        params: query,
      }),
      providesTags: ["book"],
    }),

    getBookById: builder.query({
      query: (id) => ({
        url: `/api/book/${id}`,
      }),
      providesTags: ["book"],
    }),

    getBookBySlug: builder.query({
      query: (slug) => ({
        url: `/api/book/slug/${slug}`,
      }),
      providesTags: ["book"],
    }),

    updateBook: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/book/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["book"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/api/book/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),

    updateBookStatus: builder.mutation({
      query: (id) => ({
        url: `/api/book/update/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetAllBookQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useGetBookBySlugQuery,
  useDeleteBookMutation,
  useUpdateBookStatusMutation,
} = bookApi;
