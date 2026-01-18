import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";
import { AUTH_USERS_API } from "../../enpoints";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_USERS_API}register/`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_USERS_API}login/`,
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: ({ refresh }) => ({
        url: `${AUTH_USERS_API}token/refresh/`,
        method: "POST",
        body: { refresh },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_USERS_API}logout/`,
        method: "POST",
      }),
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: `${AUTH_USERS_API}change-password/user/`,
        method: "PUT",
        body: passwords,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_USERS_API}password/request-reset/`,
        method: "POST",
        body: data,
      }),
    }),
   
    // Dans votre authApi.js
    confirmPasswordReset: builder.mutation({
      query: ({ uidb64, token, ...data }) => ({
        url: `${AUTH_USERS_API}password/reset-confirm/${uidb64}/${token}/`, // Vérifiez bien les slashs
        method: 'POST',
        body: data,
      }),
    }),
    
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useConfirmPasswordResetMutation,
} = authApi;
