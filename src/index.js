import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

import Home from "./components/Home";
import Employees from "./components/Employees";
import JobVacancies from "./components/JobVacancies";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />,
      <Route path="/talentos" component={Employees} />
      <Route path="/vagas" component={JobVacancies} />
    </Switch>
  </Router>
);

ReactDOM.render(<Routes />, document.getElementById("root"));
registerServiceWorker();
