import React from "react";

export const ConfigContext = React.createContext({
  config: {
    issuerDetails: {
      credentials: {
        address: "",
        privateKey: ""
      },
      network: "ethereum-ropsten",
      idProof: {

      }
    },
    formSchema: {

    }
  },
  setConfig: () => {}
});

export class ConfigProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      setConfig: config => {
        this.setState(prevState => {
          return { ...prevState, config };
        });
      }
    };
  }

  render() {
    return <ConfigContext.Provider value={this.state}>{this.props.children}</ConfigContext.Provider>;
  }
}
