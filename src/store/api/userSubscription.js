import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ap-916a8432b2994023864bb12867d8c2df.ecs.sa-east-1.on.aws",
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const userSubscriptionApi = createApi({
  reducerPath: 'userSubscriptionApi',
  baseQuery,
  tagTypes: ['UserSubscription'],
  endpoints: (builder) => ({

    // GET -> /subscriptions/{userId}/subscription
    getSubscriptionByUserId: builder.query({
      query: (userId) => `/subscriptions/${userId}/subscription`,
      providesTags: (result, error, userId) => [{ type: 'UserSubscription', id: userId }],
    }),

    // POST -> /subscriptions/{userId}/subscription/activate
    activateOrRenewSubscription: builder.mutation({
      query: ({ userId, activateRequest }) => ({
        url: `/subscriptions/${userId}/subscription/activate`,
        method: 'POST',
        body: activateRequest,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'UserSubscription', id: userId }],
    }),

    // POST -> /subscriptions/{userId}/subscription/cancel
    cancelRenewal: builder.mutation({
      query: (userId) => ({
        url: `/subscriptions/${userId}/subscription/cancel`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, userId) => [{ type: 'UserSubscription', id: userId }],
    }),
  }),
});

export const {
  useGetSubscriptionByUserIdQuery,
  useActivateOrRenewSubscriptionMutation,
  useCancelRenewalMutation,
} = userSubscriptionApi;