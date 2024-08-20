import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Customers", "Transactions", "Reviews"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search},
            }),
            providesTags: ["Transactions"]
        }),
        getCompanyId: build.query({
            query: (comp_id) => ({
                url: `general/company/${comp_id}`,
                method: "GET",
            }),
            providesTags: ["CompanyId"]
        }),
        getReviewDataByCompany: build.query({
            query: (comp_id) => ({
                url: `client/getReviewsByCompId?comp_id=${comp_id}`,
                method: "GET",
            }),
            providesTags: ["Reviews"]
        }),
        getSummaryDataByCompany: build.query({
            query: (comp_id) => ({
                url: `client/getSummariesByCompId?comp_id=${comp_id}`,
                method: "GET",
            }),
            providesTags: ["Reviews"]
        }),
    })
})

export const servicesApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVICES_BASE_URL }),
    reducerPath: "servicesApi",
    tagTypes: ["CompanyConnections"],
    endpoints: (build) => ({
        getCompanyConnections: build.query({
            query: (companyId) => `company_connections?company_id=${companyId}`,
            providesTags: ["CompanyConnections"]
        }),
    })
});

export const {
    useGetUserQuery,
    useGetTransactionsQuery,
    useLazyGetCompanyIdQuery,
    useGetCompanyIdQuery,
    useGetReviewDataByCompanyQuery,
    useLazyGetReviewDataByCompanyQuery,
    useGetSummaryDataByCompanyQuery,
    useLazyGetSummaryDataByCompanyQuery,
} = api;

export const {
    useGetCompanyConnectionsQuery
} = servicesApi;