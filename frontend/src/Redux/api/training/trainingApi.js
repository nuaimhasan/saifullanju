import { baseApi } from "../baseApi";

export const trainingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTraining: builder.mutation({
      query: (formData) => ({
        url: "/api/training/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["training"],
    }),

    getAllTraining: builder.query({
      query: (query) => ({
        url: "/api/training/all",
        params: query,
      }),
      providesTags: ["training"],
    }),

    getTrainingById: builder.query({
      query: (id) => ({
        url: `/api/training/${id}`,
      }),
      providesTags: ["training"],
    }),

    getTrainingBySlug: builder.query({
      query: (slug) => ({
        url: `/api/training/slug/${slug}`,
      }),
      providesTags: ["training"],
    }),

    updateTraining: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/training/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["training"],
    }),

    softDeleteTraining: builder.mutation({
      query: (id) => ({
        url: `/api/training/soft-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["training"],
    }),
  }),
});

export const {
  useAddTrainingMutation,
  useGetAllTrainingQuery,
  useGetTrainingByIdQuery,
  useUpdateTrainingMutation,
  useSoftDeleteTrainingMutation,
  useGetTrainingBySlugQuery,
} = trainingApi;
