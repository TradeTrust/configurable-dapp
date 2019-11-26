import React from "react";
import { FormDataContext } from "../../contexts/FormDataContext";

export class FormDisplay extends React.Component {
  render() {
    return (
      <FormDataContext.Consumer>
        {({ formData, setFormData }) => {
          return (<><p>Forms!</p><p>{JSON.stringify(formData)}</p>
          <ConnectedFormDisplay formData={formData} onFormSubmit={setFormData}></ConnectedFormDisplay></>);
        }}
      </FormDataContext.Consumer>
    );
  }
}

class ConnectedFormDisplay extends React.Component {
  handleFormSubmit = () => {
    this.props.onFormSubmit({"foo": "bar2"})
  }

  render() {
      return (<p>Connected Eh? <button type="button" className="btn btn-primary" onClick={this.handleFormSubmit}>Poke Me</button></p>)
  }
}