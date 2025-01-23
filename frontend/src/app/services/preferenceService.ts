// import { prepareHeaders } from './../../utils/apiUtiils';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleFilters, ArticlesResponse } from "../../@types";
import { AddPreferenceRequest, AddPreferenceResponse, Preference } from "../../@types/preferences";
import { prepareHeaders } from "../../utils/prepareHeaders";

export const preferencesApi = createApi({
  reducerPath: "preferencesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders
  }),
  // tagTypes: ["articles"],
  endpoints: (builder) => ({
    getPreferences: builder.query<Preference[], void>({
      query : () => 'preferences'
    }),
    getPreferedArticles: builder.query<ArticlesResponse, ArticleFilters>({
      query: (params) => {
        const paramsCopy: Record<string, string> = {};
        // Dynamically remove non-empty parameters
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            paramsCopy[key] = value;
          }
        });
        return {
          url: "articles/preferred",
          params: paramsCopy,
          method: "GET",
        };
      },
    }),
    addPreference: builder.mutation<AddPreferenceResponse, AddPreferenceRequest>({
        query: (credentials) => ({
          url: "preferences",
          method: "POST",
          body: credentials,
        }),
      }),
  }),
});

export const { useGetPreferedArticlesQuery, useLazyGetPreferedArticlesQuery } = preferencesApi;
