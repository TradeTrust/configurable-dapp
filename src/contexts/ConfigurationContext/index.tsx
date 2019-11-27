import React, { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export const ConfigContext = React.createContext({
  config: {
    issuerDetails: {
      credentials: {
        address: "",
        privateKey: ""
      },
      network: "ethereum-ropsten",
      idProof: {}
    },
    formSchema: []
  },
  setConfig: (config: any) => config
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
