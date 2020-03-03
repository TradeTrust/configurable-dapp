import React, { useContext, useState, ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import styled from "@emotion/styled";
import { omit, get } from "lodash";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { UploadDataView } from "./UploadDataView";
import { DisplayPreview } from "./DisplayPreview";
import { PopupModal, FooterModal } from "../common";
import { notifyError } from "../utils/toast";
import { ISSUE_DOCUMENT, TOKEN_FIELDS } from "../Constant";
import { useToken, TransactionStateStatus } from "../../services/token";
import Loader from "react-loader-spinner";
import { Helpers } from "../../styles";
import { getDocumentMetaData } from "../utils/config";
import { getLogger } from "../../logger";

const { trace, error } = getLogger("component:FormDisplay");

interface PublishToBlockchainModalInterface {
  document: Document;
  toggleConfirmationModal: (val: boolean) => void;
  beneficiaryAddress: string;
  holderAddress: string;
}

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
  const { config } = useContext(ConfigContext);

  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [holderAddress, setHolderAddress] = useState("");

  const handleSubmit = (document: Document): void => {
    try {
      documentsList.splice(activeTab, 1, document);
      setDocumentsList(documentsList);
      const documentMeta = getDocumentMetaData(config);
      trace(`document meta on submit ${JSON.stringify(documentMeta)}`);
      const tokenRegistry = get(documentMeta, "issuers[0].tokenRegistry", "");
      if (tokenRegistry) {
        const omittedDocument = omit(document, TOKEN_FIELDS);
        setBeneficiaryAddress(document.beneficiaryAddress);
        setHolderAddress(document.holderAddress);
        setDocument(omittedDocument);
      } else {
        setDocument(document);
      }
      toggleConfirmationModal(true);
    } catch (e) {
      error(`error in submit ${JSON.stringify(e)}`);
      notifyError(ISSUE_DOCUMENT.ERROR + ", " + e.message);
    }
  };

  return (
    <>
      {showConfirmationModal && (
        <PublishToBlockchainModal
          beneficiaryAddress={beneficiaryAddress}
          holderAddress={holderAddress}
          document={wrappedDocument}
          toggleConfirmationModal={toggleConfirmationModal}
        />
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

const PublishToBlockchainModal = ({
  document,
  toggleConfirmationModal,
  beneficiaryAddress,
  holderAddress
}: PublishToBlockchainModalInterface): ReactElement => {
  const [state, , mintToken] = useToken({ document });
  const history = useHistory();

  const isLoading =
    state.status === TransactionStateStatus.LOADING || state.status === TransactionStateStatus.TRANSACTION_MINING;

  const handleSubmit = async (): void => {
    await mintToken(beneficiaryAddress, holderAddress);
    history.push("/published");
  };

  useEffect(() => {
    if (state.error) {
      notifyError(state.error);
    }
  }, [state.error]);

  return (
    <PopupModal
      title="Publish Document"
      showLoader={isLoading}
      toggleDisplay={toggleConfirmationModal}
      footerComponent={<FooterModal toggleConfirmationModal={toggleConfirmationModal} onSubmit={handleSubmit} />}
    >
      {isLoading ? (
        <TalignCenter>
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </TalignCenter>
      ) : (
        <>
          <div>Are you sure you want to publish document ?</div>
        </>
      )}
    </PopupModal>
  );
};

export default FormDisplay;
