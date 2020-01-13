import React, { useContext, useState, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { JsonSchemaForm } from "@govtechsg/tradetrust-react-component";
import {WriteableToken} from "@govtechsg/oa-token";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import styled from "@emotion/styled";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import {Web3Context} from "../../contexts/Web3Context";
import { UploadDataView } from "./UploadDataView";
import { DisplayPreview } from "./DisplayPreview";
import {pick, omit} from "lodash"

const HeaderDiv = styled.div`
  background-color: dimgray;
  text-align: right;
`;

const FormDisplay = (): ReactElement => {
  const { documentsList, wrappedDocument, setDocumentsList, setDocument } = useContext(FormDataContext);
  const [activeTab] = useState(0); //Add setActiveTab method to update it when handling multitab
  const { config } = useContext(ConfigContext);
  const {web3, wallet} = useContext(Web3Context);
  const history = useHistory();

  const publishDocument = async (newOwner: string) => {
    if(!wrappedDocument || !web3 || !wallet) throw new Error("Can not initialize the token instance");

    const instance = new WriteableToken({document: wrappedDocument, web3Provider: web3, wallet});
    await instance.mint(wrappedDocument, newOwner)
    history.push("/published");
  }

  const handleSubmit = (document: Document): void => {
    try {
      documentsList.splice(activeTab, 1, document);
      setDocumentsList(documentsList);
      const newOwner = pick(document, "newOwner") as string;
      if(!newOwner) throw new Error("Please enter the new owner value to mint");
      
      omit(document, "newOwner"); 
      setDocument(document);
      publishDocument(newOwner);
    } catch(e) {
      
    }
  };

  return (
    <>
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
