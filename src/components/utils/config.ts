import { get } from "lodash";
import { Config, DocumentMeta } from "../../types";

export const getInitialFormData = (config: Config): DocumentMeta => {
  const document = get(config, "documentMeta");
  return document;
};
