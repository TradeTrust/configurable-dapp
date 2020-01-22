import React, { ReactElement } from "react";

interface PopupModalProps {
  children: ReactElement;
  title: string;
  containerStyle?: {
    [key: string]: string | number;
  };
  toggleDisplay: (val: boolean) => void;
  footerComponent?: ReactElement;
}

export const PopupModal = ({
  children,
  toggleDisplay,
  title,
  containerStyle,
  footerComponent
}: PopupModalProps): ReactElement => (
  <div id="preview-modal" className="modal" role="dialog" style={{ display: "block", overflow: "scroll" }}>
    <div className="modal-dialog" style={containerStyle}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button type="button" className="close" onClick={() => toggleDisplay(false)}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {footerComponent ? (
            footerComponent
          ) : (
            <button type="button" className="btn btn-default" onClick={() => toggleDisplay(false)}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
