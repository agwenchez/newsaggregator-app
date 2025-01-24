// import { prepareHeaders } from './../../utils/apiUtiils';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleFilters, ArticlesResponse } from "../../@types";
import {
  AddPreferenceRequest,
  AddPreferenceResponse,
  Author,
  PreferencesResponse,
  //   UpdatePreference,
  UpdatePreferenceRequest,
} from "../../@types/preferences";
import { prepareHeaders } from "../../utils/prepareHeaders";

export const preferencesApi = createApi({
  reducerPath: "preferencesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders,
  }),
  tagTypes: ["preferences"],
  endpoints: (builder) => ({
    getPreferences: builder.query<PreferencesResponse, {id: number | undefined}>({
      query: ({id}) => ({
        url: `preferences/${id}`,
      }),
      providesTags: ["preferences"],
    }),
    getAuthors: builder.query<Author[], void>({
      query: () => "authors",
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
    addPreference: builder.mutation<
      AddPreferenceResponse,
      AddPreferenceRequest
    >({
      query: (body) => ({
        url: "preferences",
        method: "POST",
        body,
      }),
      invalidatesTags: ["preferences"],
    }),
    updatePreference: builder.mutation<
      AddPreferenceResponse,
      UpdatePreferenceRequest
    >({
      query: ({ id, body }) => ({
        url: `preferences/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["preferences"],
    }),
    deletePreference: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `preferences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["preferences"],
    }),
  }),
});

export const {
  useGetPreferedArticlesQuery,
  useLazyGetPreferedArticlesQuery,
  useGetPreferencesQuery,
  useAddPreferenceMutation,
  useUpdatePreferenceMutation,
  useDeletePreferenceMutation,
  useGetAuthorsQuery
} = preferencesApi;
