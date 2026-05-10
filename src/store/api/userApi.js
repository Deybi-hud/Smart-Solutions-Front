import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/api/v1/users/profile",
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetProfileQuery, useLogoutMutation } = userApi;
