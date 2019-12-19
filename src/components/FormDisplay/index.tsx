import React, { useContext, ReactElement } from "react";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { UploadDataView } from "./UploadDataView";
import {DisplayPreview} from "./DisplayPreview";

const FormDisplay = (): ReactElement => {
  const { formData, setFormData } = useContext(FormDataContext);

  const { config } = useContext(ConfigContext);
  const handleSubmit = (formValues: object): object => setFormData(formValues);
  return (
    <>
      <DisplayPreview document={document}/>
      <UploadDataView />
      <JsonSchemaForm formSchema={config.formSchema} formData={formData} onSubmit={handleSubmit} />
    </>
  );
};

export default FormDisplay;
