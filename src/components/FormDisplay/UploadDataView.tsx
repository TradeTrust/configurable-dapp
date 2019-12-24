import React, { useContext, ReactElement } from "react";
import { readFileData } from "../utils/file";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { getInitialFormData } from "../utils/config";

export const UploadDataView = (): ReactElement => {
  const { setDocumentMeta } = useContext(FormDataContext);
  const { config } = useContext(ConfigContext);
  const initialFormData = getInitialFormData(config);

  const updateFormData = (uploadedData: Document[]): void => {
    const mergedDataSet = uploadedData.map((data: object) => ({ ...data, ...initialFormData }));
    setDocumentMeta(mergedDataSet);
  };
  const handleFileUpload = (e: any): void => {
    readFileData([...e.target.files], updateFormData);
  };
  return (
    <label className="btn btn-primary m-3">
      Upload Data File <input type="file" onChange={e => handleFileUpload(e)} hidden />
    </label>
  );
};
