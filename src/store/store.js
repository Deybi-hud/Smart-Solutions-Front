import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "./api/authApi";
import { locationApi } from "../store/api/locationApi";
import { userApi } from "../store/api/userApi";
import { plansApi } from "../store/api/plansApi";
import { subscriptionsApi } from "../store/api/subscriptionsApi";
import { paymentApi } from "../store/api/paymentApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(locationApi.middleware)
      .concat(userApi.middleware)
      .concat(plansApi.middleware)
      .concat(subscriptionsApi.middleware)
      .concat(paymentApi.middleware),
});
