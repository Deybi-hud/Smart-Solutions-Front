import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionsApi = createApi({
    reducerPath: "subscriptionsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://ap-916a8432b2994023864bb12867d8c2df.ecs.sa-east-1.on.aws",
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Subscriptions"],
    endpoints: (builder) => ({
        getUserSubscription: builder.query({
            query: (userId) => `/api/v1/subscriptions/${userId}/subscription`,
            providesTags: ["Subscriptions"],
        }),
        activateSubscription: builder.mutation({
            query: ({ userId, planId }) => ({
                url: `/api/v1/subscriptions/${userId}/subscription/activate`,
                method: "POST",
                body: { planId },
            }),
            invalidatesTags: ["Subscriptions"],
        }),
        cancelSubscription: builder.mutation({
            query: (userId) => ({
                url: `/api/v1/subscriptions/${userId}/subscription/cancel`,
                method: "POST",
            }),
            invalidatesTags: ["Subscriptions"],
        }),
    }),
});

export const {
    useGetUserSubscriptionQuery,
    useActivateSubscriptionMutation,
    useCancelSubscriptionMutation,
} = subscriptionsApi;