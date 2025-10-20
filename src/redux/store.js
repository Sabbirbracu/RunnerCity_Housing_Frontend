import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../features/api/baseApi";
import { prayerApi } from "../features/api/prayerApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [prayerApi.reducerPath]: prayerApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(prayerApi.middleware),
});

export default store;
