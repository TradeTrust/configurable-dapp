import React from "react";

export const FormDataContext = React.createContext({
  formData: {},
  setFormData: () => {}
});

export class FormDataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {"foo": "bar"},
      setFormData: formData => {
        this.setState(prevState => {
          return { ...prevState, formData };
        });
      }
    };
  }

  render() {
    return <FormDataContext.Provider value={this.state}>{this.props.children}</FormDataContext.Provider>;
  }
}
