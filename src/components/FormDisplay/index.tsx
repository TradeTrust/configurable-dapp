import React, { useContext, useState, ReactElement, useEffect } from "react";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import styled from "@emotion/styled";
import { issueDocument } from "@govtechsg/tradetrust-schema";
import { isEmpty } from "lodash";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { UploadDataView } from "./UploadDataView";
import { DisplayPreview } from "./DisplayPreview";

const HeaderDiv = styled.div`
  background-color: dimgray;
  text-align: right;
`;

interface FormDisplayProps {
  history: {
    push(url: string): void;
  };
}

const FormDisplay = (props: FormDisplayProps): ReactElement => {
  const { documentMeta, setDocumentMeta, setWrappedDocument } = useContext(FormDataContext);
  const [activeTab] = useState(0);
  const { config } = useContext(ConfigContext);

  useEffect(() => {
    if (isEmpty(config)) props.history.push("/");
  });

  const handleSubmit = (formValues: Document): void => {
    documentMeta.splice(activeTab, 1, formValues);
    const wrappedDocument = issueDocument(formValues);
    setDocumentMeta(documentMeta);
    setWrappedDocument(wrappedDocument);
  };

  return (
    <>
      <HeaderDiv id="form-header" className="container">
        {documentMeta[activeTab] && <DisplayPreview document={documentMeta[activeTab]} />}
        <UploadDataView />
      </HeaderDiv>
      <div id="form-body" className="container p-2 bg-light">
        {!isEmpty(config) && (
          <JsonSchemaForm formSchema={config.formSchema} formData={documentMeta} onSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
};

export default FormDisplay;
