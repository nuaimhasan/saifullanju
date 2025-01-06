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
  }),
});

export const { useAddTrainingOrderMutation, useGetAllTrainingOrdersQuery } =
  trainingOrderApi;
