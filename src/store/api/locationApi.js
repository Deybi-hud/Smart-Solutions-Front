import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery,
  endpoints: (builder) => ({
    getRegions: builder.query({
      query: () => "/api/v1/regions",
    }),
    getCommunes: builder.query({
      query: () => "/api/v1/communes",
    }),
    getAddresses: builder.query({
      query: () => "/api/v1/addresses",
    }),
  }),
});

export const { useGetRegionsQuery, useGetCommunesQuery, useGetAddressesQuery } =
  locationApi;
