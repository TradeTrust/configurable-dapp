import React, { ReactElement } from "react";
import { Document } from "@govtechsg/decentralized-renderer-react-components";

export const FormDataContext = React.createContext({
  formData: [],
  setFormData: (formData: object) => formData
});

export class FormDataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      setFormData: (formData: object) => {
        this.setState(prevState => {
          return { ...prevState, formData };
        });
      }
    };
  }

  render(): ReactElement {
    return <FormDataContext.Provider value={this.state}>{this.props.children}</FormDataContext.Provider>;
  }
}
