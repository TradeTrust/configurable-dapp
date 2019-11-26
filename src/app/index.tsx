import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Web3Provider } from "../contexts/Web3Context";
import { ConfigProvider } from "../contexts/ConfigurationContext";
import { ConfigDropzoneContainer } from "../components/ConfigDropzone";
import { FormDisplay } from "../components/FormDisplay";
import { Web3EnabledWidget } from "../components/ExampleWeb3Widget";
import { FormDataProvider } from "../contexts/FormDataContext";
import { css } from "@emotion/core";

export class App extends React.Component {
  render() {
    return (
      <Web3Provider>
        <ConfigProvider>
          <FormDataProvider>
            <div
              className="container"
              css={css`
                background-color: #8dbbdf;
                height: 100vh;
              `}
            >
              <div className="row h-100">
                <div className="col">
                  <Main />
                </div>
              </div>
            </div>
          </FormDataProvider>
        </ConfigProvider>
      </Web3Provider>
    );
  }
}

export const Main = () => (
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
