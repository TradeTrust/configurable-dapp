import React, { useContext, useState, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import styled from "@emotion/styled";
import { omit, get } from "lodash";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { Web3Context } from "../../contexts/Web3Context";
import { UploadDataView } from "./UploadDataView";
import { DisplayPreview } from "./DisplayPreview";
import { PopupModal, FooterModal } from "../common";
import { notifyError } from "../utils/toast";
import { ISSUE_DOCUMENT, TOKEN_FIELDS } from "../Constant";
import { initializeTokenInstance, mintToken, getTitleEscrowOwner, deployEscrowContract } from "../../services/token";
import Loader from "react-loader-spinner";
import { Helpers } from "../../styles";
import { WrappedDocument } from "@govtechsg/open-attestation";

const TalignCenter = styled.div`
  ${Helpers.talignCenter}
`;

const HeaderDiv = styled.div`
  background-color: dimgray;
  text-align: right;
`;

const FormDisplay = (): ReactElement => {
  const { documentsList, wrappedDocument, setDocumentsList, setDocument } = useContext(FormDataContext);
  const [activeTab] = useState(0); //Add setActiveTab method to update it when handling multitab
  const [showConfirmationModal, toggleConfirmationModal] = useState(false);
  const [showLoader, toggleLoader] = useState(false);
  const [isToken, setIfToken] = useState(false);
  const { config } = useContext(ConfigContext);
  const { web3, wallet } = useContext(Web3Context);
  const history = useHistory();

  const publishToken = async ({
    document,
    wrappedDocument
  }: {
    document: Document;
    wrappedDocument: WrappedDocument;
  }): Promise<void> => {
    const registryAddress = get(document, "issuers[0].tokenRegistry", "");
    const beneficiaryAddress = get(document, "beneficiaryAddress", "");
    const holderAddress = get(document, "holderAddress", "");
    await deployEscrowContract({ registryAddress, beneficiaryAddress, holderAddress, wallet, web3Provider: web3 });
    const ownerAddress = getTitleEscrowOwner();
    await initializeTokenInstance({ document: wrappedDocument, web3Provider: web3, wallet });
    await mintToken(wrappedDocument, ownerAddress);
  };

  const publishDocument = (): void => {};

  const publishToBlockchain = async (): Promise<void> => {
    try {
      toggleLoader(true);
      if (!wrappedDocument) throw new Error("can not find wrapped document");
      if (!wallet) throw new Error("Can not find wallet");
      if (!web3) throw new Error("Can not find web3 provider");
      const document = documentsList[activeTab];
      await (isToken ? publishToken({ document, wrappedDocument }) : publishDocument());
      toggleConfirmationModal(false);
      toggleLoader(false);
      history.push("/published");
    } catch (e) {
      toggleLoader(false);
      notifyError(ISSUE_DOCUMENT.ERROR + ", " + e.message);
    }
  };

  const handleSubmit = (document: Document): void => {
    try {
      documentsList.splice(activeTab, 1, document);
      setDocumentsList(documentsList);
      const tokenRegistry = get(document, "issuers[0].tokenRegistry", "");
      if (tokenRegistry) {
        setIfToken(true);
        const omittedDocument = omit(document, TOKEN_FIELDS);
        setDocument(omittedDocument);
      } else {
        setDocument(document);
      }
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
          showLoader={showLoader}
          toggleDisplay={toggleConfirmationModal}
          footerComponent={
            <FooterModal toggleConfirmationModal={toggleConfirmationModal} onSubmit={publishToBlockchain} />
          }
        >
          {showLoader ? (
            <TalignCenter>
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </TalignCenter>
          ) : (
            <>
              <div>Are you sure you want to publish document ?</div>
            </>
          )}
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
