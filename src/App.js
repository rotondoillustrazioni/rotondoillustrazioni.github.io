import "antd/lib/style/index.less";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage";

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
