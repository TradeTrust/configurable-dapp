import React, { useContext, ReactElement, useState } from "react";
import { Document } from "@govtechsg/decentralized-renderer-react-components";

import {DocumentPreview} from "../DocumentPreview";

interface PopupModalProps {
    document: Document;
    togglePreviewDisplay: (i: boolean) => void;
}


const PopupModal = ({ togglePreviewDisplay, document}: PopupModalProps) => { 
    return (
    <div id="myModal" className="modal" role="dialog" style={{display: "block", overflow: "scroll"}}>
  <div className="modal-dialog" style={{maxWidth: "100%"}}>
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close"  onClick={() => togglePreviewDisplay(false)}>&times;</button>
        <h4 className="modal-title">Document Preview</h4>
      </div>
      <div className="modal-body">
        <DocumentPreview document={document} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={() => togglePreviewDisplay(false)}>Close</button>
      </div>
    </div>
  </div>
</div>
);
}

export const DisplayPreview = ({document}: {document: Document}): ReactElement => {
    const [isPreviewVisible, togglePreviewDisplay] = useState(false);
    if(isPreviewVisible) {
        return (<PopupModal document={document} togglePreviewDisplay={togglePreviewDisplay} />);
    }
  return (
    <button className="btn btn-primary" onClick={() => togglePreviewDisplay(!isPreviewVisible)}>
      Show Preview
    </button>
  );
};
