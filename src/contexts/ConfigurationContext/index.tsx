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
    formSchema: [
      {
        id: "xyz",
        name: "DEMO CNM",
        schema: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              title: "ID",
              ui: {
                "ui:autofocus": true,
                "ui:placeholder": "enter id for the document"
              }
            },
            name: {
              type: "string",
              title: "Name",
              ui: {
                "ui:placeholder": "enter name of the document"
              }
            }
          }
        }
      }
    ]
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
