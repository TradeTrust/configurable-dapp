import { get } from "lodash";
import { Config, DocumentMeta } from "../../types";
import { Wallet } from "ethers";

export const getDocumentMetaData = (config: Config): DocumentMeta => {
  const document = get(config, "documentMeta");
  return document;
};

export const getWallet = (config: Config): Wallet => {
  const wallet = get(config, "wallet");
  return wallet;
};
