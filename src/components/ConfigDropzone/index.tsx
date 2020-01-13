import React, { useContext, ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { FormDataContext } from "../../contexts/FormDataContext";
import { Web3Context } from "../../contexts/Web3Context";

import { DropzoneView } from "./DropzoneView";
import { getLogger } from "../../logger";
import { readFileData } from "../utils/file";
import { notifyError } from "../utils/toast";
import { DATA_FILE_UPLOAD } from "../Constant";
import { getDocumentMetaData, getWallet } from "../utils/config";

const { trace } = getLogger("components/ConfigDropzone");

const ConfigDropzoneContainer = (): ReactElement => {
  const { config, setConfig } = useContext(ConfigContext);
  const { setDocumentsList } = useContext(FormDataContext);
  const { setWallet } = useContext(Web3Context);

  const [isPasswordModalVisible, togglePasswordModal] = useState(false);

  const history = useHistory();
  const processConfigUpdate = (configFile: any): void => {
    setConfig(configFile);
    const documentMeta = getDocumentMetaData(configFile);
    setDocumentsList([documentMeta]);
    togglePasswordModal(true);
    const wallet = getWallet(configFile);
    setWallet(wallet, "password");
    history.push("/form");
  };

  return <ConfigDropzone config={config} onConfigUpdate={processConfigUpdate} />;
};

const ConfigDropzone = (props: any): ReactElement => {
  const handleConfigUpdate = (configFile: any): void => {
    props.onConfigUpdate(configFile);
  };

  const handleFileError = (e: any): void => {
    notifyError(DATA_FILE_UPLOAD.ERROR + ", " + e.message);
  };

  const handleFileDrop = (acceptedFiles: File[]): void => {
    trace(`Accepted files: ${acceptedFiles}`);
    readFileData(acceptedFiles, handleConfigUpdate, handleFileError);
  };

  return (
    <div className="h-100">
      <div className="row h-25" />
      <div className="row h-50">
        <div id="dropzone-container" className="col">
          <DropzoneView onFileDrop={handleFileDrop} />
        </div>
      </div>
      <div className="row h-25" />
    </div>
  );
};

export default ConfigDropzoneContainer;
