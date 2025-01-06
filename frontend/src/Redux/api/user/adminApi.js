import { baseApi } from "../baseApi.js";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ({
        url: "/api/admin/all",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/api/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    addAdmin: builder.mutation({
      query: (info) => ({
        url: `/api/admin/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["user"],
    }),
    updateInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/admin/updateInfo/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/admin/updatePassword/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/admin/deleteAccount/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useAddAdminMutation,
  useUpdateInfoMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = adminApi;
