import React, { ReactElement, useState } from "react";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import { DocumentPreview } from "../DocumentPreview";

interface PopupModalProps {
  document: Document;
  togglePreviewDisplay: (i: boolean) => void;
}


const PublishedDocumentView = ({ document }: { document: Document }): ReactElement => {

  return (
    <DocumentPreview document={document} />
  );
};

export default PublishedDocumentView;