import { baseApi } from "./baseApi";

export const shippingConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShippingConfig: builder.query({
      query: () => ({
        url: "/api/shipping-config",
      }),
      providesTags: ["shippingConfig"],
    }),
    updateShippingConfig: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/shipping-config/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["shippingConfig"],
    }),
    addShippingConfig: builder.mutation({
      query: (contactInfo) => ({
        url: `/api/shipping-config/add`,
        method: "POST",
        body: contactInfo,
      }),
      invalidatesTags: ["shippingConfig"],
    }),
  }),
});

export const {
  useGetShippingConfigQuery,
  useUpdateShippingConfigMutation,
  useAddShippingConfigMutation,
} = shippingConfigApi;
