import React, { ReactElement, useState } from "react";

import { PopupModal, FooterModal } from "../Common";
import { DropzoneView } from "./DropzoneView";
import { getLogger } from "../../logger";
import { readFileData } from "../utils/file";
import { notifyError } from "../utils/toast";
import { DATA_FILE_UPLOAD } from "../Constant";
const { trace } = getLogger("components/ConfigDropzone");

export const ConfigDropzone = (props: any): ReactElement => {
  const [password, setPassword] = useState("");
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

  const setWallet = (): void => {
    if (!password) notifyError("Please enter valid password");
    else props.setWalletData(password);
  };

  return (
    <>
      {props.isPasswordModalVisible && (
        <PopupModal
          title="Enter Password"
          toggleDisplay={props.togglePasswordModal}
          footerComponent={<FooterModal toggleConfirmationModal={props.togglePasswordModal} onSubmit={setWallet} />}
        >
          <>
            <input type="text" onChange={e => setPassword(e.target.value)} />
          </>
        </PopupModal>
      )}
      <div className="h-100">
        <div className="row h-25" />
        <div className="row h-50">
          <div id="dropzone-container" className="col">
            <DropzoneView onFileDrop={handleFileDrop} />
          </div>
        </div>
        <div className="row h-25" />
      </div>
    </>
  );
};
