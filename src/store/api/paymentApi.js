import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
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
