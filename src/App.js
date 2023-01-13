import "antd/lib/style/index.less";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import "./App.css";
import translationIT from "./locales/it";
import translationEN from "./locales/en";
import Homepage from "./pages/homepage";
import ProjectPage from "./pages/projectpage";
import Contacts from "./pages/contacts";
import AboutUs from "./pages/aboutus";
import IllustratorsHome from "./pages/illustratorspages/illustratorshome";
import Login from "./pages/login";
import { useSelector } from "react-redux";
import React from "react";
import IllustratorsProfile from "./pages/illustratorspages/illustratorsprofile";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: translationEN },
      it: { translation: translationIT },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

function App() {
  const { path } = useRouteMatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const PrivateRoute = ({ ...props }) => {
    return loggedIn ? <Route {...props} /> : <Redirect to="/login" />;
  };

  return (
    <div>
      <Switch>
        <PrivateRoute
          exact
          path={`${path}illustrators-home`}
          component={IllustratorsHome}
        />
        <PrivateRoute
          exact
          path={`${path}illustrators-profile`}
          component={IllustratorsProfile}
        />
        <Route exact path={`${path}/`} component={Homepage} />
        <Route exact path={`${path}project/:id`} component={ProjectPage} />
        <Route exact path={`${path}contacts`} component={Contacts} />
        <Route exact path={`${path}aboutus`} component={AboutUs} />
        <Route exact path={`${path}login`} component={Login} />
      </Switch>
    </div>
  );
}

export default App;
