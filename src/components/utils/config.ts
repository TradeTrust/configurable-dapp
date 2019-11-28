import { get } from "lodash";

export const getInitialFormData = (config: any): object => {
  const documentStore = get(config, "issuerDetails.credentials.address");
  const identityProof = get(config, "issuerDetails.idProof");
  return { issuers: [{ documentStore, identityProof }] };
};
