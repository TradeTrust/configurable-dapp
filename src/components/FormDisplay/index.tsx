import React, { useContext, useState, ReactElement } from "react";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import styled from "@emotion/styled";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { UploadDataView } from "./UploadDataView";
import { DisplayPreview } from "./DisplayPreview";
import { PopupModal } from "../Common/PopupModal";

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
  const { documentsMeta, setDocumentMeta, setWrappedDocument } = useContext(FormDataContext);
  const [activeTab] = useState(0);
  const [showConfirmationModal, toggleConfirmationModal] = useState(false);
  const { config } = useContext(ConfigContext);

  const handleSubmit = (formValues: Document): void => {
    documentsMeta.splice(activeTab, 1, formValues);
    setDocumentMeta(documentsMeta);
    setWrappedDocument(formValues);
    toggleConfirmationModal(true);
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
        {documentsMeta[activeTab] && <DisplayPreview document={documentsMeta[activeTab]} />}
        <UploadDataView />
      </HeaderDiv>
      <div id="form-body" className="container p-2 bg-light">
        <JsonSchemaForm formSchema={config.formSchema} formData={documentsMeta} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default FormDisplay;
