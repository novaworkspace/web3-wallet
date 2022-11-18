import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const authReducer = persistReducer(
  {
    key: "rtk:auth",
    storage,
    whitelist: ["accessToken"],
  },
  authSlice.reducer
);
