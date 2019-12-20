import React, { useContext, ReactElement } from "react";
import { readFileData } from "../utils/file";
import { FormDataContext } from "../../contexts/FormDataContext";

export const UploadDataView = (): ReactElement => {
  const { setUnsignedData } = useContext(FormDataContext);
  const handleFileUpload = (e: any): void => {
    readFileData([...e.target.files], setUnsignedData);
  };
  return (
    <label className="btn btn-primary m-3">
      Upload Data File <input type="file" onChange={e => handleFileUpload(e)} hidden />
    </label>
  );
};
