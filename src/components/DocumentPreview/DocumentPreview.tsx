import React, { useCallback, useEffect, useState } from "react";
import { FrameConnector, FrameActions, HostActionsHandler, Document } from "@govtechsg/decentralized-renderer-react-components";
import { css } from "@emotion/core";

interface DocumentPreviewProps {
  document: Document
}

export const DocumentPreview = ({document}: DocumentPreviewProps): React.ReactElement => {
  const [toFrame, setToFrame] = useState<HostActionsHandler>();
  const [height, setHeight] = useState(50);
  const [templates, setTemplates] = useState<{ id: string; label: string }[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const fn = useCallback((toFrame: HostActionsHandler) => {
    // wrap into a function otherwise toFrame function will be executed
    setToFrame(() => toFrame);
  }, []);

  const fromFrame = (action: FrameActions): void => {
    if (action.type === "UPDATE_HEIGHT") {
      setHeight(action.payload);
    }
    if (action.type === "UPDATE_TEMPLATES") {
      setTemplates(action.payload);
      setSelectedTemplate(action.payload[0].id);
    }
  };
  useEffect(() => {
    if (toFrame) {
      toFrame({
        type: "RENDER_DOCUMENT",
        payload: {
          document
        }
      });
    }
  }, [toFrame]);
  useEffect(() => {
    if (toFrame && selectedTemplate) {
      toFrame({
        type: "SELECT_TEMPLATE",
        payload: selectedTemplate
      });
    }
  }, [selectedTemplate, toFrame]);

  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
          button {
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
            display: inline-block;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            user-select: none;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;
          }
          button:hover {
            color: #fff;
            background-color: #0069d9;
            border-color: #0062cc;
          }
        `}
      >
        <button
          onClick={() => {
            if (toFrame) {
              toFrame({
                type: "PRINT"
              });
            }
          }}
        >
          Print
        </button>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          .tab {
            margin-left: 1rem;
            margin-right: 1rem;
            margin-bottom: 0.5rem;
            padding: 1rem;
            border: 1px solid black;
            cursor: pointer;
          }
          .tab.selected {
            border: 1px solid blue;
          }
        `}
      >
        {templates.map(template => (
          <div
            key={template.id}
            className={`tab ${selectedTemplate === template.id ? "selected" : ""}`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {template.label}
          </div>
        ))}
      </div>
      <div>
        <FrameConnector
          source="https://demo-cnm.openattestation.com"
          dispatch={fromFrame}
          onConnected={fn}
          css={css`
            display: block;
            margin: auto;
            max-width: 1120px;
            width: 100%;
            height: ${height}px;
          `}
        />
      </div>
    </div>
  );
};