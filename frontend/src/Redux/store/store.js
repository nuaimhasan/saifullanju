import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi.js";
import userSlice from "../api/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
