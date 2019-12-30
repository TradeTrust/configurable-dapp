import React, { useContext, ReactElement } from "react";
import { readFileData } from "../utils/file";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { getDocumentMetaData } from "../utils/config";

export const UploadDataView = (): ReactElement => {
  const { setDocumentsList } = useContext(FormDataContext);
  const { config } = useContext(ConfigContext);
  const documentMeta = getDocumentMetaData(config);

  const updateFormData = (uploadedFormData: Document[]): void => {
    const mergedDocumentsSet = uploadedFormData.map((formData: Document) => ({ ...formData, ...documentMeta }));
    setDocumentsList(mergedDocumentsSet);
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
