import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Customers", "Transactions"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"]
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
    })
})


export const {
    useGetUserQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useLazyGetCompanyIdQuery,
    useGetCompanyIdQuery,
} = api;