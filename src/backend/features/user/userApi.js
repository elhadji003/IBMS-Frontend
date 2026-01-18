import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";
import { USERS_API } from "../../enpoints";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserProfile"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
        query: () => ({
        url: `${USERS_API}profile/`,
        method: "GET",
      }),
        providesTags: ["UserProfile"],
    }),
    getProfileUserById: builder.query({
      query: (id) => ({
        url: `${USERS_API}profile/${id}/`,
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: `${USERS_API}update/profile/`,
        method: "PUT",
        body: profileData,
      }),
        invalidatesTags: ["UserProfile"],
    }),
    deleteUserAccount: builder.mutation({
      query: (password) => ({
        url: `${USERS_API}delete/account/`,
        method: "DELETE",
        body: { password },
      }),
    }),
  }),
});

export const { 
  useGetUserProfileQuery, 
  useGetProfileUserByIdQuery, 
  useUpdateUserProfileMutation, 
  useDeleteUserAccountMutation 
} = userApi;
