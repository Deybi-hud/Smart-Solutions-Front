import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://ap-916a8432b2994023864bb12867d8c2df.ecs.sa-east-1.on.aws" }),
  endpoints: (builder) => ({
    createPreference: builder.mutation({
      query: (body) => ({
        url: '/api/payments/preference',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreatePreferenceMutation } = paymentApi;