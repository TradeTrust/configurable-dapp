import React, { ReactElement } from "react";
import { issueDocument } from "@govtechsg/tradetrust-schema";
import { Document, SignedDocument } from "@govtechsg/decentralized-renderer-react-components";

export const FormDataContext = React.createContext({
  documentsMeta: [],
  setDocumentMeta: (documentsMeta: Document[]) => documentsMeta,
  wrappedDocument: {},
  setWrappedDocument: (wrappedDocument: Document) => wrappedDocument
});

interface FormDataProps {
  children: ReactElement;
}

export class FormDataProvider extends React.Component {
  constructor(props: FormDataProps) {
    super(props);
    this.state = {
      documentsMeta: [],
      wrappedDocument: {},
      setDocumentMeta: (documentsMeta: Document[]) => {
        this.setState(prevState => {
          return { ...prevState, documentsMeta };
        });
      },
      setWrappedDocument: (documentMeta: Document) => {
        const wrappedDocument = issueDocument(documentMeta);
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
