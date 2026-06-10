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
  tagTypes: ["Profile", "Users"],
  endpoints: (builder) => ({
    // Perfil propio
    getProfile: builder.query({
      query: () => "/api/v1/users/profile",
      providesTags: ["Profile"],
    }),

    // Actualizar contacto propio (name, lastName, phone)
    updateContact: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/profile/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/users/logout",
        method: "POST",
      }),
    }),

    // Admin: buscar por email
    searchByEmail: builder.query({
      query: (email) => `/api/v1/admin/users/search-email/${email}`,
      providesTags: ["Users"],
    }),

    // Admin: buscar por teléfono
    searchByPhone: builder.query({
      query: (phone) => `/api/v1/admin/users/search-phone/${phone}`,
      providesTags: ["Users"],
    }),

    // Admin: listar todos
    listUsers: builder.query({
      query: () => "/api/v1/admin/users",
      providesTags: ["Users"],
    }),

    // Admin: actualizar usuario por email
    updateUserByEmail: builder.mutation({
      query: ({ email, data }) => ({
        url: `/api/v1/admin/users/update-by-email/${email}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
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
} = userApi;
