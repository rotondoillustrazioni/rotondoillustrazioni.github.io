import { logout } from "./reducers";

export const logoutMiddleware = (store) => (next) => (action) => {
  // console.log("store", store);
  // console.log("next", next);
  // console.log("action", action);
  if (
    action.type &&
    action.type.endsWith("/rejected") &&
    action.error &&
    action.error.message === "Request failed with status code 401"
  ) {
    store.dispatch(logout());
  }
  return next(action);
};
