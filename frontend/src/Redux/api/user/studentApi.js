import { baseApi } from "../baseApi.js";
import { userLoggedIn } from "./userSlice.js";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentRegister: builder.mutation({
      query: (info) => ({
        url: "/api/user/processRegister",
        method: "POST",
        body: info,
      }),
    }),

    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/api/user/login",
        method: "POST",
        body: loginInfo,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            localStorage.setItem("token", result?.data?.token);

            dispatch(
              userLoggedIn({
                data: result?.data,
              })
            );
          }
        } catch (error) {
          // Do not any thing , handel error from ui
          console.log(error);
        }
      },
    }),

    studentUpdateInfo: builder.mutation({
      query: (data) => ({
        url: `/api/user/update/info`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUsers: builder.query({
      query: (query) => ({
        url: "/api/user/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useStudentRegisterMutation,
  useLoginMutation,
  useStudentUpdateInfoMutation,
  useGetAllUsersQuery,
} = studentApi;
