import React, { useContext, ReactElement } from "react";
import { readFileData } from "../utils/file";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { getInitialFormData } from "../utils/config";
import { notifySuccess, notifyError } from "../utils/toast";
import { DATA_FILE_UPLOAD } from "../Constant";

export const UploadDataView = (): ReactElement => {
  const { setDocumentMeta } = useContext(FormDataContext);
  const { config } = useContext(ConfigContext);
  const initialFormData = getInitialFormData(config);

  const updateFormData = (uploadedData: Document[]): void => {
    const mergedDataSet = uploadedData.map((data: object) => ({ ...data, ...initialFormData }));
    setDocumentMeta(mergedDataSet);
    notifySuccess(DATA_FILE_UPLOAD.SUCCESS);
  };

  const handleFileError = (e: any): void => {
    notifyError(DATA_FILE_UPLOAD.ERROR + ", " + e.message);
  };
  const handleFileUpload = (e: any): void => {
    readFileData([...e.target.files], updateFormData, handleFileError);
  };
  return (
    <label className="btn btn-primary m-3">
      Upload Data File <input type="file" onChange={e => handleFileUpload(e)} hidden />
    </label>
  );
};
