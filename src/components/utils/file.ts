export const readFileData = (acceptedFiles: any[], handleUpdate: Function): void => {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      handleUpdate(json);
    } catch (e) {
      console.error(e);
    }
  };
  acceptedFiles.map(file => reader.readAsText(file));
};
