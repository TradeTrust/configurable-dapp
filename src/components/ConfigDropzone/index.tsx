import React, { useContext, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import Dropzone from "react-dropzone";
import { css } from "@emotion/core";
import { getLogger } from "../../logger";
import { readFileData } from "../utils/file";

const { trace } = getLogger("components/ConfigDropzone");

const ConfigDropzoneContainer = (): ReactElement => {
  const { config, setConfig } = useContext(ConfigContext);
  const history = useHistory();
  const processConfigUpdate = (configFile: any): void => {
    setConfig(configFile);
    history.push("/form");
  };

  return <ConfigDropzone config={config} onConfigUpdate={processConfigUpdate} />;
};

const ConfigDropzone = (props: any): ReactElement => {
  const handleConfigUpdate = (configFile: any): void => {
    props.onConfigUpdate(configFile);
  };

  const handleFileDrop = (acceptedFiles: File): void => {
    trace(acceptedFiles);
    readFileData(acceptedFiles, handleConfigUpdate);
  };

  return (
    <div className="h-100">
      <div className="row h-25" />
      <div className="row h-50">
        <div className="col">
          <Dropzone onDrop={handleFileDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="h-100">
                <div
                  {...getRootProps({
                    className: "p-3",
                    css: css`
                      border-color: #d7d9db;
                      border-style: dashed;
                      border-radius: 1rem;
                      height: 100%;
                      text-align: center;
                      background-color: white;
                    `
                  })}
                >
                  <input {...getInputProps()} />
                  <p>Drag &apos;n&apos; drop TradeTrust configuration file here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
      <div className="row h-25" />
    </div>
  );
};

export default ConfigDropzoneContainer;

// export const ConfigDropzoneContainer = () => {
//   const { config, setConfig } = useContext(ConfigContext);

//   let history = useHistory();
//   const handleNext = useCallback(e => {
//     history.push("/form");
//   }, []);

//   const populateExampleConfig = setConfig({ foo2: "bar2" });

//   return (
//     <ConfigContext.Consumer>
//       {({ config }) => {
//         <>
//           <p>{JSON.stringify(config)}</p>
//           <Button onClick={handleNext}>Next</Button>
//         </>;
//       }}
//     </ConfigContext.Consumer>
//   );
// };
