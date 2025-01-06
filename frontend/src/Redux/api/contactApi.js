import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query({
      query: () => ({
        url: "/api/contact",
      }),
      providesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/contact/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
    addContact: builder.mutation({
      query: (contactInfo) => ({
        url: `/api/contact/add`,
        method: "POST",
        body: contactInfo,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactQuery,
  useUpdateContactMutation,
  useAddContactMutation,
} = contactApi;
