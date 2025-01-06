import { baseApi } from "./baseApi";

export const speechApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpeech: builder.query({
      query: () => ({
        url: "/api/speech",
      }),
      providesTags: ["speech"],
    }),
    updateSpeech: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/speech/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["speech"],
    }),
    addSpeech: builder.mutation({
      query: (data) => ({
        url: `/api/speech/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["speech"],
    }),
  }),
});

export const {
  useGetSpeechQuery,
  useUpdateSpeechMutation,
  useAddSpeechMutation,
} = speechApi;
