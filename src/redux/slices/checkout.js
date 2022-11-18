import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authSlice } from "./auth";
let baseUrl = "https://api.seller.one";

if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  baseUrl = "http://localhost:3000";
}

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  tagTypes: ["Users", "MyPets", "Pets", "Profiles", "Activities"],
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.seller.one"
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      console.log("getState()", getState());
      const token = getState().authSlice.accessToken;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users/`,
      providesTags: ["Users"],
    }),
    getMyOwn: builder.query({
      query: () => `/users/get-my-own`,
      providesTags: ["MyPets"],
    }),
    getPets: builder.query({
      query: ({ userId }) => `/users/get-pets/${userId}`,
      providesTags: (result, error, { userId: id }) => [{ type: "Pets", id }],
    }),
    getMe: builder.query({
      query: () => `/users/get-me`,
      providesTags: ["Profiles"],
      providesTags: (result) => [{ type: "Profiles", id: result.id }],
    }),
    getProfile: builder.query({
      query: ({ userId }) => `/users/profile/${userId}`,
      providesTags: (result, error, { userId: id }) => [
        { type: "Profiles", id },
      ],
    }),
    getActivity: builder.query({
      query: () => `/users/get-activity`,
      providesTags: ["Activities"],
    }),
    login: builder.mutation({
      // invalidatesTags: ["Users", "Profile"],
      query: (tgUser, ...args) => {
        console.log("query", args);
        const dataCheckArr = Object.keys(tgUser)
          .map((key) => `${key}=${tgUser[key]}`)
          .join("&");

        return `${baseUrl}/auth/login?${dataCheckArr}`;
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        console.log("login onstar");
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          console.log("login data", data, checkoutApi.endpoints);
          await dispatch(
            authSlice.actions.updateAccessToken(data.access_token)
          );

          window.location.href = "/";

          // await dispatch(
          //   checkoutApi.endpoints.getMe.initiate({}, { forceRefetch: true })
          // );
        } catch (err) {
          console.log("login err", err);
          // `onError` side-effect
          // dispatch(messageCreated("Error fetching post!"));
        }
      },
    }),

    buy: builder.mutation({
      query: ({ petId }) => `/users/buy?petId=${petId}`,
      invalidatesTags: ["Users", "Profiles", "MyPets", "Pets", "Activities"],
    }),

    sendToWork: builder.mutation({
      query: ({ petId }) => `/users/send-to-work?petId=${petId}`,
      invalidatesTags: ["Users", "Profiles", "MyPets", "Pets", "Activities"],
    }),

    sendToTraining: builder.mutation({
      query: ({ petId }) => `/users/train?petId=${petId}`,
      invalidatesTags: ["Users", "Profiles", "MyPets", "Pets", "Activities"],
    }),

    requestTransfer: builder.mutation({
      query: ({ id, tokenId }) => ({
        url: `/api/v1/payments/${id}/monitoring_start`,
        method: "POST",
        body: { token_id: tokenId },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMyOwnQuery,
  useGetPetsQuery,
  useGetMeQuery,
  useGetProfileQuery,
  useGetActivityQuery,
  useLoginMutation,
  useBuyMutation,
  // useBuyQuery,
} = checkoutApi;
