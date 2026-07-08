import { authApi } from "./api/authApi";
import { locationApi } from "./api/locationApi";
import { userApi } from "./api/userApi";
import { plansApi } from "./api/plansApi";
import { subscriptionsApi } from "./api/subscriptionsApi";
import { paymentApi } from "./api/paymentApi";

export const resetAllApiCaches = (dispatch) => {
  dispatch(authApi.util.resetApiState());
  dispatch(locationApi.util.resetApiState());
  dispatch(userApi.util.resetApiState());
  dispatch(plansApi.util.resetApiState());
  dispatch(subscriptionsApi.util.resetApiState());
  dispatch(paymentApi.util.resetApiState());
};
