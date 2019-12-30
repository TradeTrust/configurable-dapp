import React, { useContext, useState, ReactElement } from "react";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import styled from "@emotion/styled";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { UploadDataView } from "./UploadDataView";
import { DisplayPreview } from "./DisplayPreview";
import { PopupModal } from "../Common/PopupModal";
import { notifyError } from "../utils/toast";
import { ISSUE_DOCUMENT } from "../Constant";

const HeaderDiv = styled.div`
  background-color: dimgray;
  text-align: right;
`;

interface FooterModalProps {
  toggleConfirmationModal: (i: boolean) => void;
  publishDocument: (val: boolean) => void;
}

//add publish document method to publish it on blockchain.
const FooterModal = ({ toggleConfirmationModal, publishDocument }: FooterModalProps): ReactElement => (
  <>
    <button type="button" className="btn btn-default" onClick={() => toggleConfirmationModal(false)}>
      Close
    </button>
    <button type="button" className="btn btn-primary" onClick={() => publishDocument(false)}>
      Ok
    </button>
  </>
);

const FormDisplay = (): ReactElement => {
  const { documentsList, setDocumentsList, setDocument } = useContext(FormDataContext);
  const [activeTab] = useState(0); //Add setActiveTab method to update it when handling multitab
  const [showConfirmationModal, toggleConfirmationModal] = useState(false);
  const { config } = useContext(ConfigContext);

  const handleSubmit = (document: Document): void => {
    try {
      documentsList.splice(activeTab, 1, document);
      setDocumentsList(documentsList);
      setDocument(document);
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
          footerComponent={
            <FooterModal toggleConfirmationModal={toggleConfirmationModal} publishDocument={toggleConfirmationModal} />
          }
        >
          <>
            <div>Are you sure you want to publish document. </div>
            <p> The estimated cost is 0.000045 eth and time is 10 sec </p>
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
