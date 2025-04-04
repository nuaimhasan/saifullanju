import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogout } from "./user/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = getState().user.token;
    if (token) {
      headers.set("Authorization", `bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const token = api.getState().user.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/loggedUser`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!data?.success) {
    api.dispatch(userLogout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
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
