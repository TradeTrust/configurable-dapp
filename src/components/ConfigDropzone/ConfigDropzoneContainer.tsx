import React, { useContext, ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { FormDataContext } from "../../contexts/FormDataContext";
import { Web3Context } from "../../contexts/Web3Context";
import { getDocumentMetaData, getWalletMeta } from "../utils/config";
import { ConfigDropzone } from "./ConfigDropzoneView";

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
  };

  const setWalletData = async (password: string): Promise<void> => {
    try {
      const wallet = getWalletMeta(config);
      await setWallet(wallet, password);
      history.push("/form");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ConfigDropzone
      config={config}
      onConfigUpdate={processConfigUpdate}
      setWalletData={setWalletData}
      isPasswordModalVisible={isPasswordModalVisible}
      togglePasswordModal={togglePasswordModal}
    />
  );
};

export default ConfigDropzoneContainer;
