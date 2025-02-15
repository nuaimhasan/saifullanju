import { baseApi } from "./baseApi";

export const paymentInstructionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentInstruction: builder.query({
      query: () => ({
        url: "/api/payment-instruction",
      }),
      providesTags: ["PaymentInstruction"],
    }),
    updatePaymentInstruction: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/payment-instruction/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["PaymentInstruction"],
    }),
    addPaymentInstruction: builder.mutation({
      query: (contactInfo) => ({
        url: `/api/payment-instruction/add`,
        method: "POST",
        body: contactInfo,
      }),
      invalidatesTags: ["PaymentInstruction"],
    }),
  }),
});

export const {
  useGetPaymentInstructionQuery,
  useUpdatePaymentInstructionMutation,
  useAddPaymentInstructionMutation,
} = paymentInstructionApi;
