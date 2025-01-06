import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "/api/service/all",
      }),
      providesTags: ["services"],
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/api/service/${id}`,
      }),
      providesTags: ["services"],
    }),
    addService: builder.mutation({
      query: (formData) => ({
        url: `/api/service/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["services"],
    }),
    updateService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/service/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/api/service/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetSingleServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
