import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_AUTH_API_URL || "http://localhost:8080",
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
    getRegions: builder.query({
      query: () => "/api/v1/regions",
      providesTags: ["Regions"],
    }),
    updateRegion: builder.mutation({
      query: ({ id, data }) => ({ url: `/api/v1/regions/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Regions"],
    }),
    setRegionActive: builder.mutation({
      query: ({ id, active }) => ({ url: `/api/v1/regions/${id}/status`, method: "PATCH", body: { active } }),
      invalidatesTags: ["Regions", "Communes", "Addresses"],
    }),

    getCommunes: builder.query({
      query: () => "/api/v1/communes",
      providesTags: ["Communes"],
    }),
    updateCommune: builder.mutation({
      query: ({ id, data }) => ({ url: `/api/v1/communes/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Communes"],
    }),
    setCommuneActive: builder.mutation({
      query: ({ id, active }) => ({ url: `/api/v1/communes/${id}/status`, method: "PATCH", body: { active } }),
      invalidatesTags: ["Communes", "Addresses"],
    }),

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
  useUpdateRegionMutation,
  useSetRegionActiveMutation,
  useGetCommunesQuery,
  useUpdateCommuneMutation,
  useSetCommuneActiveMutation,
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = locationApi;