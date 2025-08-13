import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_NEWSDATA_URL;
const API_KEY = process.env.REACT_APP_NEWSDATA_KEY;

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => ({
        url: "news",
        params: {
          apikey: API_KEY,
          q: newsCategory || "cryptocurrency",
          language: "en",
          category: "business",
        },
      }),
      // Convert NewsData.io -> Bing-like shape
      transformResponse: (res, _meta, arg) => {
        const items = Array.isArray(res?.results) ? res.results : [];
        const sliced = items.slice(0, arg?.count || items.length);

        return {
          value: sliced.map((it) => ({
            name: it.title,
            url: it.link,
            description: it.description || it.content || "",

            image: it.image_url
              ? { thumbnail: { contentUrl: it.image_url } }
              : null,

            provider: [
              {
                name: it.source_id || "Unknown",
                image: it.image_url
                  ? { thumbnail: { contentUrl: it.image_url } }
                  : null,
              },
            ],

            datePublished: it.pubDate || it.isoDate || it.date,
          })),
        };
      },
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
