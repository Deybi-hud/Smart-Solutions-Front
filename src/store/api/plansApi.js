import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const plansApi = createApi({
    reducerPath: "plansApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_CORE_API_URL || "http://localhost:8082",
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Plans"],
    endpoints: (builder) => ({
        getActivePlans: builder.query({
            query: () => "/api/v1/plans",
            providesTags: ["Plans"],
        }),
        getPlanById: builder.query({
            query: (id) => "/api/v1/plans/" + id,
            providesTags: ["Plans"],
        }),
        getAllPlansAdmin: builder.query({
            query: () => "/api/v1/plans/admin/all",
            providesTags: ["Plans"],
        }),
        createPlan: builder.mutation({
            query: (data) => ({
                url: "/api/v1/plans/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Plans"],
        }),
        updatePlan: builder.mutation({
            query: ({ id, ...data }) => ({
                url: "/api/v1/plans/" + id,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Plans"],
        }),
        deletePlan: builder.mutation({
            query: (id) => ({
                url: "/api/v1/plans/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Plans"],
        }),
    }),
});

export const {
    useGetActivePlansQuery,
    useGetPlanByIdQuery,
    useGetAllPlansAdminQuery,
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useDeletePlanMutation,
} = plansApi;
