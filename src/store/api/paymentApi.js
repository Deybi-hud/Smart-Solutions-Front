import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_PAYMENT_API_URL || "http://localhost:8080",
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createPaymentPreference: builder.mutation({
            query: (data) => ({
                url: "/api/payments/preference",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useCreatePaymentPreferenceMutation } = paymentApi;
