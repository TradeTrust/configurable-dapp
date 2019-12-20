import React, { useContext, useState, ReactElement } from "react";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { Document, SignedDocument } from "@govtechsg/decentralized-renderer-react-components";
import styled from "@emotion/styled";
import { issueDocument } from "@govtechsg/tradetrust-schema";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { UploadDataView } from "./UploadDataView";
import { DisplayPreview } from "./DisplayPreview";
import { getInitialFormData } from "../utils/config";

const HeaderDiv = styled.div`
  background-color: dimgray;
  text-align: right;
`;

const FormDisplay = (): ReactElement => {
  const { formData, setFormData } = useContext<Document>(FormDataContext);
  const [singedDocument, setSignedDocument] = useState<SignedDocument<any> | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { config } = useContext(ConfigContext);
  const initialFormData = getInitialFormData(config);

  const formFieldValues =
    formData && formData.length > 0
      ? formData.map((data: object) => ({ ...data, ...initialFormData }))
      : [initialFormData];

  const handleSubmit = (formValues: Document): void => {
    formData[activeTab] = formValues;
    const wrappedDocument = issueDocument(formValues);
    setFormData(formData);
    setSignedDocument(wrappedDocument);
  };

  // on submit should
  // 1) validate data
  // 2) pass data to form context
  // 3) go to issuance component

  return (
    <>
      <HeaderDiv className="container">
        {formData[activeTab] && <DisplayPreview document={formData[activeTab]} />}
        <UploadDataView />
      </HeaderDiv>
      <div className="container p-2 bg-light">
        <JsonSchemaForm formSchema={config.formSchema} formData={formFieldValues} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default FormDisplay;
