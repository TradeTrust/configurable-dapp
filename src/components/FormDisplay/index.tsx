import React, { useContext, useState, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import styled from "@emotion/styled";
import { get, omit } from "lodash";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { Web3Context } from "../../contexts/Web3Context";
import { UploadDataView } from "./UploadDataView";
import { DisplayPreview } from "./DisplayPreview";
import { PopupModal, FooterModal } from "../common";
import { notifyError } from "../utils/toast";
import { ISSUE_DOCUMENT } from "../Constant";
import { initializeTokenInstance, mintToken } from "../../services/token";

const HeaderDiv = styled.div`
  background-color: dimgray;
  text-align: right;
`;

const FormDisplay = (): ReactElement => {
  const { documentsList, wrappedDocument, setDocumentsList, setDocument } = useContext(FormDataContext);
  const [activeTab] = useState(0); //Add setActiveTab method to update it when handling multitab
  const [showConfirmationModal, toggleConfirmationModal] = useState(false);
  const { config } = useContext(ConfigContext);
  const { web3, wallet } = useContext(Web3Context);
  const history = useHistory();

  const publishDocument = async (): Promise<void> => {
    try {
      if (!wrappedDocument || !web3 || !wallet) throw new Error("Can not initialize the token instance");
      const document: Document = documentsList[activeTab];
      const initialTokenOwnerAddress = get(document, "initialTokenOwnerAddress", "");
      if (!initialTokenOwnerAddress) throw new Error("Please enter the new owner value to mint");

      await initializeTokenInstance({ document: wrappedDocument, web3Provider: web3, wallet });
      await mintToken(wrappedDocument, initialTokenOwnerAddress);
      history.push("/published");
    } catch (e) {
      notifyError(ISSUE_DOCUMENT.ERROR + ", " + e.message);
    }
  };

  const handleSubmit = (document: Document): void => {
    try {
      documentsList.splice(activeTab, 1, document);
      setDocumentsList(documentsList);
      omit(document, "initialTokenOwnerAddress");
      setDocument(document);
      history.push("/published");
      toggleConfirmationModal(true);
    } catch (e) {
      notifyError(ISSUE_DOCUMENT.ERROR + ", " + e.message);
    }
  };

  return (
    <>
      {showConfirmationModal && (
        <PopupModal
          title="Publish Document"
          toggleDisplay={toggleConfirmationModal}
          footerComponent={<FooterModal toggleConfirmationModal={toggleConfirmationModal} onSubmit={publishDocument} />}
        >
          <>
            <div>Are you sure you want to publish document ?</div>
          </>
        </PopupModal>
      )}
      <HeaderDiv id="form-header" className="container">
        {documentsList[activeTab] && <DisplayPreview document={documentsList[activeTab]} />}
        <UploadDataView />
      </HeaderDiv>
      <div id="form-body" className="container p-2 bg-light">
        <JsonSchemaForm formSchema={config.formSchema} formData={documentsList} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default FormDisplay;
