import React, { useContext, useState, ReactElement, useEffect } from "react";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import styled from "@emotion/styled";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { UploadDataView } from "./UploadDataView";
import { DisplayPreview } from "./DisplayPreview";

const HeaderDiv = styled.div`
  background-color: dimgray;
  text-align: right;
`;

const FormDisplay = (): ReactElement => {
  const { documentsMeta, setDocumentMeta, setWrappedDocument } = useContext(FormDataContext);
  const [activeTab] = useState(0);
  const { config } = useContext(ConfigContext);

  const handleSubmit = (formValues: Document): void => {
    documentsMeta.splice(activeTab, 1, formValues);
    setDocumentMeta(documentsMeta);
    setWrappedDocument(formValues);
  };

  return (
    <>
      <HeaderDiv id="form-header" className="container">
        {documentsMeta[activeTab] && <DisplayPreview document={documentsMeta[activeTab]} />}
        <UploadDataView />
      </HeaderDiv>
      <div id="form-body" className="container p-2 bg-light">
          <JsonSchemaForm formSchema={config.formSchema} formData={documentsMeta} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default FormDisplay;
