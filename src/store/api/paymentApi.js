import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://smartsolutions-payment-alb-42793780.sa-east-1.elb.amazonaws.com/",
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