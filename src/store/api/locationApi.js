import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_AUTH_API_URL || "http://localhost:8081",
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery,
  tagTypes: ["Regions", "Communes", "Addresses"],
  endpoints: (builder) => ({
    // Regiones
    getRegions: builder.query({
      query: () => "/api/v1/regions",
      providesTags: ["Regions"],
    }),
    createRegion: builder.mutation({
      query: (data) => ({
        url: "/api/v1/regions",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Regions"],
    }),
    updateRegion: builder.mutation({
      query: ({ id, data }) => ({ url: `/api/v1/regions/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Regions"],
    }),
    deleteRegion: builder.mutation({
      query: (id) => ({ url: `/api/v1/regions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Regions", "Communes", "Addresses"],
    }),

    // Comunas
    getCommunes: builder.query({
      query: () => "/api/v1/communes",
      providesTags: ["Communes"],
    }),
    createCommune: builder.mutation({
      query: (data) => ({ url: "/api/v1/communes", method: "POST", body: data }),
      invalidatesTags: ["Communes"],
    }),
    updateCommune: builder.mutation({
      query: ({ id, data }) => ({ url: `/api/v1/communes/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Communes"],
    }),
    deleteCommune: builder.mutation({
      query: (id) => ({ url: `/api/v1/communes/${id}`, method: "DELETE" }),
      invalidatesTags: ["Communes", "Addresses"],
    }),

    // Addresses (sucursales)
    getAddresses: builder.query({
      query: () => "/api/v1/addresses",
      providesTags: ["Addresses"],
    }),
    createAddress: builder.mutation({
      query: (data) => ({ url: "/api/v1/addresses", method: "POST", body: data }),
      invalidatesTags: ["Addresses"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({ url: `/api/v1/addresses/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Addresses"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({ url: `/api/v1/addresses/${id}`, method: "DELETE" }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
  useGetCommunesQuery,
  useCreateCommuneMutation,
  useUpdateCommuneMutation,
  useDeleteCommuneMutation,
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = locationApi;