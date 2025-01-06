import { baseApi } from "../baseApi";

export const bookOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBookOrderOrder: builder.mutation({
      query: (data) => ({
        url: "/api/bookOrder/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookOrder"],
    }),

    getAllBookOrders: builder.query({
      query: (query) => ({
        url: "/api/bookOrder/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["bookOrder"],
    }),

    getBookOrderById: builder.query({
      query: (id) => `/api/bookOrder/${id}`,
      providesTags: ["bookOrder"],
    }),

    updateBookOrderStatus: builder.mutation({
      query: (data) => ({
        url: `/api/bookOrder/update/status/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["bookOrder"],
    }),
  }),
});

export const {
  useAddBookOrderOrderMutation,
  useGetAllBookOrdersQuery,
  useGetBookOrderByIdQuery,
  useUpdateBookOrderStatusMutation,
} = bookOrderApi;
