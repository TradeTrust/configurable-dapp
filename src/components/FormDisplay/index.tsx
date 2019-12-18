import React, { useContext, ReactElement } from "react";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import styled from "@emotion/styled";
import { FormProps } from "react-jsonschema-form";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { UploadDataView } from "./UploadDataView";
import { getInitialFormData } from "../utils/config";

const HeaderDiv = styled.div`
  background-color: dimgray;
  text-align: right;
`;

const FormDisplay = (): ReactElement => {
  const { formData, setFormData } = useContext(FormDataContext);
  const { config } = useContext(ConfigContext);
  const initialFormData = getInitialFormData(config);
  const formFieldValues =
    formData && formData.length > 0
      ? formData.map((data: object) => ({ ...data, ...initialFormData }))
      : [initialFormData];
  const handleSubmit = (formValues: object): object => setFormData(formValues);

  // on submit should
  // 1) validate data
  // 2) pass data to form context
  // 3) go to issuance component

  return (
    <>
      <HeaderDiv className="container">
        <UploadDataView />
      </HeaderDiv>
      <div className="container p-2 bg-light">
        <JsonSchemaForm formSchema={config.formSchema} formData={formFieldValues} onSubmit={handleSubmit} />
      </div>
    </>
  )
};

export default FormDisplay;
