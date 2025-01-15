import { baseApi } from "../baseApi";

export const trainingOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTrainingOrder: builder.mutation({
      query: (data) => ({
        url: "/api/trainingOrder/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["trainingOrder"],
    }),
    getAllTrainingOrders: builder.query({
      query: (query) => ({
        url: "/api/trainingOrder/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["trainingOrder"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/trainingOrder/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["trainingOrder"],
    }),
    deleteTrainingOrder: builder.mutation({
      query: (id) => ({
        url: `/api/trainingOrder/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["trainingOrder"],
    }),
  }),
});

export const {
  useAddTrainingOrderMutation,
  useGetAllTrainingOrdersQuery,
  useUpdateStatusMutation,
  useDeleteTrainingOrderMutation,
} = trainingOrderApi;
