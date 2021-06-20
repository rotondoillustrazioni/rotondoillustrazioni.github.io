import "antd/lib/style/index.less";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import "./App.css";
import translationIT from "./locales/en";
import Homepage from "./pages/homepage";
import ProjectImage from "./pages/projectImage";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: translationIT },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

function App() {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/`} component={Homepage} />
        <Route exact path={`${path}project/:id`} component={ProjectImage} />
      </Switch>
    </div>
  );
}

export default App;
