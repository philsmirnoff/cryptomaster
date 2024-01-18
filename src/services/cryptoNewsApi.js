// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const cryptoNewsHeaders = {
//   'x-bingapis-sdk': 'true',
//   'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
//   'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
//   }

//   // 36c82a3f1ca1467884f7459eb8f43ff3

//   const createRequest = (url) => ({
//     url, headers: cryptoNewsHeaders
//   })

//   export const cryptoNewsApi = createApi({
//     reducerPath: 'cryptoNewsApi',
//     baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_NEWS_API_URL }),
//     endpoints: (builder) => ({
//       getCryptoNews: builder.query({
//         query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
//       })
//     })
//   });


// export const { useGetCryptoNewsQuery } = cryptoNewsApi;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
  // 'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY,
  'X-Api-key': '36c82a3f1ca1467884f7459eb8f43ff3'
};

const createRequest = (url) => ({
  url,
  headers: newsApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_NEWS_API_URL }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/v2/everything?q=${newsCategory}&pageSize=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
