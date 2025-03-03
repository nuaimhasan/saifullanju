import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const token = window.localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "services",
    "contact",
    "logo",
    "favicon",
    "speech",
    "about",
    "blog",
    "category",
    "seo",
    "training",
    "trainingOrder",
    "book",
    "bookOrder",
    "user",
    "shippingConfig",
    "paymentInstruction",
    "gallery",
  ],
});
