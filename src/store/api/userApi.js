import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_AUTH_API_URL || "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["Profile", "Users"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/api/v1/users/profile",
      providesTags: ["Profile"],
    }),

    updateContact: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/profile/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/users/logout",
        method: "POST",
      }),
    }),

    searchByEmail: builder.query({
      query: (email) => "/api/v1/admin/users/search-email/" + email,
      providesTags: ["Users"],
    }),

    searchByPhone: builder.query({
      query: (phone) => "/api/v1/admin/users/search-phone/" + phone,
      providesTags: ["Users"],
    }),

    listUsers: builder.query({
      query: () => "/api/v1/admin/users",
      providesTags: ["Users"],
    }),

    updateUserByEmail: builder.mutation({
      query: ({ email, data }) => ({
        url: "/api/v1/admin/users/update-by-email/" + email,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateEmail: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/email",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateContactMutation,
  useLogoutMutation,
  useSearchByEmailQuery,
  useSearchByPhoneQuery,
  useListUsersQuery,
  useUpdateUserByEmailMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} = userApi;