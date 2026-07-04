import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionsApi = createApi({
    reducerPath: "subscriptionsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_CORE_API_URL || "http://localhost:8082",
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Subscriptions"],
    endpoints: (builder) => ({
        getUserSubscription: builder.query({
            query: (userId) => "/api/v1/subscriptions/" + userId + "/subscription",
            providesTags: ["Subscriptions"],
        }),
        activateSubscription: builder.mutation({
            query: ({ userId, planId }) => ({
                url: "/api/v1/subscriptions/" + userId + "/subscription/activate",
                method: "POST",
                body: { planId },
            }),
            invalidatesTags: ["Subscriptions"],
        }),
        cancelSubscription: builder.mutation({
            query: (userId) => ({
                url: "/api/v1/subscriptions/" + userId + "/subscription/cancel",
                method: "POST",
            }),
            invalidatesTags: ["Subscriptions"],
        }),
        getSubscriptionHistory: builder.query({
            query: (userId) => "/api/v1/subscriptions/" + userId + "/subscription/history",
            providesTags: ["Subscriptions"],
        }),
        getAllSubscriptionsAdmin: builder.query({
            query: () => "/api/v1/subscriptions/admin/all",
            providesTags: ["Subscriptions"],
        }),
    }),
});

export const {
    useGetUserSubscriptionQuery,
    useActivateSubscriptionMutation,
    useCancelSubscriptionMutation,
    useGetSubscriptionHistoryQuery,
    useGetAllSubscriptionsAdminQuery,
} = subscriptionsApi;
