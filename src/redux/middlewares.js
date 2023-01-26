// @ts-nocheck
import { logout, newNotificationWS, resetNewNotificationWS } from "./reducers";
import io from "socket.io-client";

export const logoutMiddleware = (store) => (next) => (action) => {
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

let socket = null;
export const notificationsMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case "WS_CONNECT":
      if (socket !== null) {
        socket.disconnect();
      }

      // connect to the remote host
      socket = io(action.host);
      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });

      store.dispatch(resetNewNotificationWS());

      socket.on("new_notification", (n) => {
        store.dispatch(newNotificationWS(n));
      });
      break;
    case "WS_DISCONNECT":
      if (socket !== null) {
        socket.disconnect();
      }
      socket = null;
      break;

    case "WS_SEND_MESSAGE":
      if (socket !== null) {
        socket.emit("message-values", action.data);
      }
      break;
    default:
      return next(action);
  }
};
