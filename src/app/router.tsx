import React, { ReactElement, Suspense, lazy, useContext, ComponentType } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { isEmpty } from "lodash";

import { ConfigContext } from "../contexts/ConfigurationContext";

const ConfigDropzoneContainer = lazy((): any => import("../components/ConfigDropzone"));
const FormDisplay = lazy((): any => import("../components/FormDisplay"));
const Web3EnabledWidget = lazy((): any => import("../components/ExampleWeb3Widget"));

interface RouteProps {
  component: ComponentType<any>;
  exact: boolean;
  path: string;
}

const ValidatedRoute = ({component: Component, ...rest}: RouteProps) => {
  const { config } = useContext(ConfigContext);
  return (<Route {...rest} render={props => !isEmpty(config) ? <Component {...props} /> : <Redirect to='/' />} />);
}

export const Routes = (): ReactElement => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={ConfigDropzoneContainer} />
        <ValidatedRoute exact path="/form" component={FormDisplay} />
        <Route exact path="/web3-example" component={Web3EnabledWidget} />
      </Switch>
    </Suspense>
  </Router>
);
