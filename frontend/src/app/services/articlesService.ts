// import { prepareHeaders } from './../../utils/apiUtiils';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleFilters, ArticlesResponse } from "../../@types";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    // prepareHeaders
  }),
  // tagTypes: ["articles"],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, ArticleFilters>({
      query: (params) => {
        const paramsCopy: Record<string, string> = {};
        // Dynamically add other non-empty parameters
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            paramsCopy[key] = value;
          }
        });
        return {
          url: "articles",
          params: paramsCopy,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLazyGetArticlesQuery, useGetArticlesQuery } = articlesApi;
