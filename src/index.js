import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import ScrollToTop from "./components/routerScrollToTop";

ReactDOM.render(
  <Router>
  <ScrollToTop />
  <Switch>
      <Route path="/" component={App} />
  </Switch>
</Router>,
  document.getElementById('root')
);