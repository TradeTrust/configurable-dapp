import { get } from "lodash";

export const getInitialFormData = (config: any): object => {
  const document = get(config, "documentMeta");
  return document;
};
