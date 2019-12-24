import React, { ReactElement } from "react";
import { Config } from "../../types";

interface Props {
  children: ReactElement;
}

export const ConfigContext = React.createContext({
  config: {
    application: {
      wallet: {},
      network: "ethereum-ropsten"
    },
    documentMeta: {
      name: "",
      $template: {
        name: "",
        type: "EMBEDDED_RENDERER",
        url: ""
      },
      issuers: [
        {
          name: "",
          tokenRegistry: "",
          identityProof: {
            type: "DNS-TXT",
            location: ""
          }
        }
      ]
    },
    formSchema: []
  },
  setConfig: (config: Config) => config
});

export class ConfigProvider extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      config: {},
      setConfig: (config: any) => {
        this.setState(prevState => {
          return { ...prevState, config };
        });
      }
    };
  }

  render(): ReactElement {
    return <ConfigContext.Provider value={this.state}>{this.props.children}</ConfigContext.Provider>;
  }
}
