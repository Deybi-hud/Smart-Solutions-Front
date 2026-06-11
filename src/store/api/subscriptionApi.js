import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ap-916a8432b2994023864bb12867d8c2df.ecs.sa-east-1.on.aws",
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const plansApi = createApi({
  reducerPath: 'plansApi',
  baseQuery,
  tagTypes: ['Plan'],
  endpoints: (builder) => ({

    // GET -> /plans    
    getAllActivePlans: builder.query({
      query: () => '/plans',
      providesTags: ['Plan'],
    }),

    // GET -> /plans/{id}
    getPlanById: builder.query({
      query: (id) => `/plans/${id}`,
      providesTags: (result, error, id) => [{ type: 'Plan', id }],
    }),

    // GET -> /plans/admin/all
    getAllPlansForAdmin: builder.query({
      query: () => '/plans/admin/all',
      providesTags: ['Plan'],
    }),

    // POST -> /plans/create
    createPlan: builder.mutation({
      query: (newPlan) => ({
        url: '/plans/create',
        method: 'POST',
        body: newPlan,
      }),
      invalidatesTags: ['Plan'],
    }),

    // PUT -> /plans/{id}
    updatePlan: builder.mutation({
      query: ({ id, ...planData }) => ({
        url: `/plans/${id}`,
        method: 'PUT',
        body: planData,
      }),
      invalidatesTags: (result, error, { id }) => ['Plan', { type: 'Plan', id }],
    }),
  }),
});

export const {
  useGetAllActivePlansQuery,
  useGetPlanByIdQuery,
  useGetAllPlansForAdminQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
} = plansApi;