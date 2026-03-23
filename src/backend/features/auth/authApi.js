import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";
import { AUTH_USERS_API } from "../../enpoints";

// Petite fonction utilitaire pour nettoyer les doubles slashes éventuels
const cleanUrl = (base, path) => {
  const url = `${base}${path}`;
  return url.replace(/([^:]\/)\/+/g, "$1"); // Remplace // par / sauf après http:
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: cleanUrl(AUTH_USERS_API, "register/"),
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: cleanUrl(AUTH_USERS_API, "login/"),
        method: "POST",
        body: credentials,
      }),
    }),

    refreshToken: builder.mutation({
      query: ({ refresh }) => ({
        url: cleanUrl(AUTH_USERS_API, "token/refresh/"),
        method: "POST",
        body: { refresh },
      }),
    }),

    logout: builder.mutation({
      query: (data) => ({
        // Note: Django SimpleJWT a souvent besoin du refresh token pour logout (blacklist)
        url: cleanUrl(AUTH_USERS_API, "logout/"),
        method: "POST",
        body: data, // Envoyer { refresh: "votre_token" } si nécessaire
      }),
    }),

    changePassword: builder.mutation({
      query: (passwords) => ({
        url: cleanUrl(AUTH_USERS_API, "change-password/user/"),
        method: "PUT",
        body: passwords,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: cleanUrl(AUTH_USERS_API, "password/request-reset/"),
        method: "POST",
        body: data,
      }),
    }),

    confirmPasswordReset: builder.mutation({
      query: ({ uidb64, token, ...data }) => ({
        // Correction de la structure de l'URL pour correspondre aux routes Django standards
        url: cleanUrl(AUTH_USERS_API, `password/reset-confirm/${uidb64}/${token}/`),
        method: 'POST',
        body: data, // Contient généralement { password, token, uidb64 }
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