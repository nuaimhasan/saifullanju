import { baseApi } from "../baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/api/blog/category/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    getAllCategory: builder.query({
      query: () => ({
        url: "/api/blog/category/all",
      }),
      providesTags: ["category"],
    }),

    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/api/blog/category/${id}`,
      }),
      providesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/blog/category/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/blog/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
