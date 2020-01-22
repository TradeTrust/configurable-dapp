import React, { ReactElement, useState, useEffect } from "react";

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
}: PopupModalProps): ReactElement => {
  const [isFadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: any): void => {
      event = event || window.event;
      // escape key
      if (event.keyCode == 27) {
        toggleDisplay(false);
      }
    };

    setTimeout(() => {
      setFadeIn(true);
    }, 0);

    document.addEventListener("keydown", onKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [toggleDisplay]);

  return (
    <>
      <div className="modal-open">
        <div
          id="preview-modal"
          className={`modal fade ${isFadeIn && "show"}`}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" style={containerStyle}>
            <form className="modal-content" onSubmit={() => toggleDisplay(false)}>
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
            </form>
          </div>
        </div>
        <div className={`modal-backdrop fade ${isFadeIn && "show"}`} />
      </div>
    </>
  );
};
