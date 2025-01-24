// import { prepareHeaders } from './../../utils/apiUtiils';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleFilters, ArticlesResponse } from "../../@types";
import { BASE_URL } from "../../@types/constants";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders
  }),
  // tagTypes: ["articles"],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, ArticleFilters>({
      query: (params) => {
        const paramsCopy: Record<string, string> = {};
        // Dynamically remove non-empty parameters
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
