import React, { ReactElement, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ConfigDropzoneContainer = lazy((): any => import("../components/ConfigDropzone"));
const FormDisplay = lazy((): any => import("../components/FormDisplay"));
const Web3EnabledWidget = lazy((): any => import("../components/ExampleWeb3Widget"));

export const Routes = (): ReactElement => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={ConfigDropzoneContainer} />
        <Route exact path="/form" component={FormDisplay} />
        <Route exact path="/web3-example" component={Web3EnabledWidget} />
      </Switch>
    </Suspense>
  </Router>
);
