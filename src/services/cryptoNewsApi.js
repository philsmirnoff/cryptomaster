import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
  'Ocp-Apim-Subscription-Key': process.env.REACT_APP_BING_API_KEY,
};

const createRequest = (url) => ({
  url,
  headers: newsApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BING_API_URL }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `search?q=${newsCategory}&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
