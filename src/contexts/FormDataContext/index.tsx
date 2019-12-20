import React, { ReactElement } from "react";
import { Document, SignedDocument } from "@govtechsg/decentralized-renderer-react-components";

export const FormDataContext = React.createContext({
  unSignedData: [],
  setUnsignedData: (formData: Document[]) => formData,
  signedData: {},
  setSignedData: (signedData: SignedDocument<any>) => signedData
});

interface FormDataProps {
  children: ReactElement;
}

export class FormDataProvider extends React.Component {
  constructor(props: FormDataProps) {
    super(props);
    this.state = {
      unSignedData: [],
      signedData: {},
      setUnsignedData: (unSignedData: Document[]) => {
        this.setState(() => {
          return { unSignedData };
        });
      },
      setSignedData: (signedData: SignedDocument<any>) => {
        this.setState(() => {
          return { signedData };
        });
      }
    };
  }

  render(): ReactElement {
    return <FormDataContext.Provider value={this.state}>{this.props.children}</FormDataContext.Provider>;
  }
}
