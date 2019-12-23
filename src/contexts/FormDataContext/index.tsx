import React, { ReactElement } from "react";
import { Document, SignedDocument } from "@govtechsg/decentralized-renderer-react-components";

export const FormDataContext = React.createContext({
  documentMeta: [],
  setDocumentMetaData: (documentMeta: Document[]) => documentMeta,
  wrappedDocument: {},
  setWrappedDocument: (wrappedDocument: SignedDocument<any>) => wrappedDocument
});

interface FormDataProps {
  children: ReactElement;
}

export class FormDataProvider extends React.Component {
  constructor(props: FormDataProps) {
    super(props);
    this.state = {
      documentMeta: [],
      wrappedDocument: {},
      setDocumentMetaData: (documentMeta: Document[]) => {
        this.setState(prevState => {
          return { ...prevState, documentMeta };
        });
      },
      setWrappedDocument: (wrappedDocument: SignedDocument<any>) => {
        this.setState(prevState => {
          return { ...prevState, wrappedDocument };
        });
      }
    };
  }

  render(): ReactElement {
    return <FormDataContext.Provider value={this.state}>{this.props.children}</FormDataContext.Provider>;
  }
}
