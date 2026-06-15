import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://ap-916a8432b2994023864bb12867d8c2df.ecs.sa-east-1.on.aws",
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
