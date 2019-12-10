import React, { useContext, ReactElement } from "react";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { UploadDataView } from "./UploadDataView";
import { FormProps } from "react-jsonschema-form"

const FormDisplay = (): ReactElement => {
  const { formData, setFormData } = useContext(FormDataContext);

  const { config } = useContext(ConfigContext);
  const formSchema = config.formSchema as Array<FormProps<undefined>["schema"]>;
  const handleSubmit = (formValues: object): object => setFormData(formValues);
  return (
    <>
      {/* <UploadDataView /> */}
      <JsonSchemaForm formSchema={formSchema} formData={formData} onSubmit={handleSubmit} />
    </>
  );
};

export default FormDisplay;
