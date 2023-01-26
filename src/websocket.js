export const wsConnect = (host) => ({ type: "WS_CONNECT", host });
export const wsDisconnect = (host) => ({ type: "WS_DISCONNECT", host });
export const wsSendMessage = (message) => ({
  type: "WS_SEND_MESSAGE",
  data: message,
});

export const wsNewNotification = (notification) => ({
  type: "NEW_NOTIFICATION",
  data: notification,
});
