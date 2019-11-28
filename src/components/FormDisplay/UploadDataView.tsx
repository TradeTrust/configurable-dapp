import React, { useContext, ReactElement } from "react";
import { readFileData } from "../utils/file";
import { FormDataContext } from "../../contexts/FormDataContext";

export const UploadDataView = (): ReactElement => {
  const { setFormData } = useContext(FormDataContext);
  const handleFileUpload = (e: any): void => {
    readFileData([...e.target.files], setFormData);
  };
  return (
    <label className="btn btn-primary m-3">
      Upload Data File <input type="file" onChange={handleFileUpload} hidden />
    </label>
  );
};
