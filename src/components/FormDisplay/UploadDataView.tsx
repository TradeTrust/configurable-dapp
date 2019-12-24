import React, { useContext, ReactElement } from "react";
import { readFileData } from "../utils/file";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { getInitialFormData } from "../utils/config";

export const UploadDataView = (): ReactElement => {
  const { setDocumentMetaData } = useContext(FormDataContext);
  const handleFileUpload = (e: any): void => {
    readFileData([...e.target.files], setDocumentMetaData);
  };
  return (
    <label className="btn btn-primary m-3">
      Upload Data File <input type="file" onChange={e => handleFileUpload(e)} hidden />
    </label>
  );
};
