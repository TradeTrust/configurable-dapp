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
import { getInitialFormData } from "../utils/config";

const HeaderDiv = styled.div`
  background-color: dimgray;
  text-align: right;
`;

const FormDisplay = (props): ReactElement => {
  const { unSignedData, setUnsignedData, setSignedData } = useContext(FormDataContext);
  const [activeTab] = useState(0);
  const { config } = useContext(ConfigContext);
  const initialFormData = getInitialFormData(config);

  useEffect(() => {
    if (isEmpty(config)) props.history.push("/");
  });

  const formFieldValues =
    unSignedData && unSignedData.length > 0
      ? unSignedData.map((data: object) => ({ ...data, ...initialFormData }))
      : [initialFormData];

  const handleSubmit = (formValues: Document): void => {
    unSignedData.splice(activeTab, 1, formValues);
    const wrappedDocument = issueDocument(formValues);
    setUnsignedData(unSignedData);
    setSignedData(wrappedDocument);
  };

  return (
    <>
      <HeaderDiv className="container">
        {unSignedData[activeTab] && <DisplayPreview document={unSignedData[activeTab]} />}
        <UploadDataView />
      </HeaderDiv>
      <div className="container p-2 bg-light">
        {!isEmpty(config) && (
          <JsonSchemaForm formSchema={config.formSchema} formData={formFieldValues} onSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
};

export default FormDisplay;
