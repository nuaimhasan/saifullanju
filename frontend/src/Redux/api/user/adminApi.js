import { baseApi } from "../baseApi.js";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: (query) => ({
        url: "/api/user/admin/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["user"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    addAdmin: builder.mutation({
      query: (info) => ({
        url: `/api/user/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["user"],
    }),
    updateInfo: builder.mutation({
      query: (data) => ({
        url: `/api/user/update/info`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/api/user/update/password`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/user/deleteAccount/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useDeleteAdminMutation,
  useAddAdminMutation,
  useUpdateInfoMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = adminApi;
