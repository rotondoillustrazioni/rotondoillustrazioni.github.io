import "antd/lib/style/index.less";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import "./App.css";
import translationIT from "./locales/it";
import Homepage from "./pages/homepage";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      it: { translation: translationIT },
    },
    lng: "it",
    fallbackLng: "it",
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
      </Switch>
    </div>
  );
}

export default App;
