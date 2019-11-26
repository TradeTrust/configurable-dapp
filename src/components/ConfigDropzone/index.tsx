import React, { useContext } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import Dropzone from "react-dropzone";
import { css } from "@emotion/core"
import { getLogger } from "../../logger"

const { trace } = getLogger("components/ConfigDropzone")

export class ConfigDropzoneContainer extends React.Component {

  processConfigUpdate = (configFile) => {
   const { setConfig } = this.context; 
   setConfig(configFile)
  }

  render() {
    const { config, setConfig } = this.context;
    return (
          <ConfigDropzone config={config} onConfigUpdate={this.processConfigUpdate}></ConfigDropzone>
    );
  }
}

ConfigDropzoneContainer.contextType = ConfigContext

class ConfigDropzone extends React.Component {
  handleConfigUpdate = (configFile) => {
    this.props.onConfigUpdate(configFile);
  };

  handleFileDrop = acceptedFiles => {
    trace(acceptedFiles);
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result);
        this.handleConfigUpdate(json);
      } catch (e) {
        console.error(e);
      }
    };

    acceptedFiles.map(file => reader.readAsText(file))
  };

  render() {
    return (
      <div className="h-100">
        <div className="row h-25">
        </div>
        <div className="row h-50">
        <div className="col">

        <Dropzone onDrop={this.handleFileDrop}>
          {({ getRootProps, getInputProps }) => (
            <section className="h-100">
              <div {...getRootProps({className: "p-3", css: css`border-color: #d7d9db; border-style: dashed; border-radius: 1rem; height: 100%; text-align: center; background-color: white`})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop TradeTrust configuration file here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
          </div>
          </div>
          <div className="row h-25">

          </div>

      </div>
    );
  }
}

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
