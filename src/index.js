import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { load, save } from "redux-localstorage-simple";
import App from "./App";
import ScrollToTop from "./components/routerScrollToTop";
import reducers from "./redux/reducers";
import { logoutMiddleware } from "./redux/middlewares";

const store = configureStore({
  reducer: reducers,
  middleware: [save(), logoutMiddleware, ...getDefaultMiddleware()],
  preloadedState: load(),
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
