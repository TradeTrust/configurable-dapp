import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ConfigDropzoneContainer } from "../components/ConfigDropzone";
import { FormDisplay } from "../components/FormDisplay";
import { Web3EnabledWidget } from "../components/ExampleWeb3Widget";

export const Routes = (): ReactElement => (
  <Router>
    <Switch>
      <Route exact path="/">
        <ConfigDropzoneContainer />
      </Route>

      <Route path="/form">
        <FormDisplay />
      </Route>

      <Route path="/web3-example">
        <Web3EnabledWidget />
      </Route>
    </Switch>
  </Router>
);
