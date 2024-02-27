import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import md5 from "md5";

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");

const password = "Valantis";
const xAuth = md5(`${password}_${timestamp}`);

const commonHeaders = {
  "Content-Type": "application/json",
  "X-Auth": xAuth,
};

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.valantis.store:40000/",
  }),

  endpoints: (builder) => ({
    // возвращает упорядоченный список идентификаторов товаров.
    get_ids: builder.query({
      query: (params) => ({
        url: "",
        method: "POST",
        headers: {
          ...commonHeaders,
        },
        body: JSON.stringify(params),
      }),
    }),
    //возвращает упорядоченный список товаров со всеми характеристиками, если переданы идентификаторы товаров.
    get_items: builder.query({
      query: (params) => ({
        url: "",
        method: "POST",
        headers: {
          ...commonHeaders,
        },
        body: JSON.stringify({
          action: "get_items",
          params: { ids: params },
        }),
      }),
    }),
    // возвращает поля фильтрации
    get_fields: builder.query({
      query: (params) => ({
        url: "",
        method: "POST",
        headers: {
          ...commonHeaders,
        },
        body: JSON.stringify(params),
      }),
    }),
    // первый фильтр, наименования цена бренд
    get_fieldsFilter: builder.query({
      query: ({ event }) => ({
        url: "",
        method: "POST",
        headers: {
          ...commonHeaders,
        },
        body: JSON.stringify({
          action: "get_fields",
          params: { field: event },
        }),
      }),
    }),
    // второй фильтр, детали
    get_fieldsSubFilter: builder.query({
      query: ({ fieldsStateCurrent, event }) => ({
        url: "",
        method: "POST",
        headers: {
          ...commonHeaders,
        },
        body: JSON.stringify({
          action: "filter",
          params:
            fieldsStateCurrent === "price"
              ? { price: +event }
              : fieldsStateCurrent === "product"
              ? { product: event }
              : { brand: event },
        }),
      }),
    }),
  }),
});

export const {
  useGet_idsQuery,
  useGet_itemsQuery,
  useGet_fieldsQuery,
  useGet_fieldsFilterQuery,
  useGet_fieldsSubFilterQuery,
} = api;

export default api;
