/**
 *  TODO: Extract this code out to its own package to reuse in tradetrust-website
 */

import { WriteableToken } from "@govtechsg/oa-token";

import { getLogger } from "../logger";

import { useState, useContext, useEffect } from "react";
import { Web3Context } from "../contexts/Web3Context";

const { trace, error } = getLogger("useToken");

interface TransactionState {
  status: TransactionStateStatus;
  error: any;
}

export enum TransactionStateStatus {
  LOADING = "loading",
  READY = "ready",
  NO_WALLET = "no_wallet",
  TRANSACTION_MINING = "transaction-mining",
  ERROR = "error"
}

export const useEthereumTransactionState = () => {
  const [state, setState] = useState<TransactionState>({ status: TransactionStateStatus.LOADING, error: undefined });

  const setLoading = () => setState({ status: TransactionStateStatus.LOADING, error: undefined });
  const setNoWallet = () => setState({ status: TransactionStateStatus.NO_WALLET, error: undefined });
  const setReady = () => setState({ status: TransactionStateStatus.READY, error: undefined });
  const setMining = () => setState({ status: TransactionStateStatus.TRANSACTION_MINING, error: undefined });

  const setError = (e: any) => setState({ status: TransactionStateStatus.ERROR, error: e });

  return { state, setLoading, setNoWallet, setReady, setMining, setError };
};

type UseToken = [TransactionState, WriteableToken | null, MintToken];
type MintToken = (beneficiary: string, holder: string) => Promise<any>;

export const useToken = ({ document }): UseToken => {
  trace(`document to initialize ${JSON.stringify(document)}`);

  const [tokenInstance, setTokenInstance] = useState<WriteableToken | null>(null);
  const { state, setReady, setMining, setError } = useEthereumTransactionState();

  const { web3, wallet } = useContext(Web3Context);

  const mintToken: MintToken = async (beneficiary: string, holder: string) => {
    trace(`Minting to b: ${beneficiary}, h: ${holder}`);
    try {
      if (!tokenInstance) {
        throw new Error(`Token is not initialised`);
      }
      setMining();
      const txHash = await tokenInstance.mintToEscrow(beneficiary, holder);
      setReady();
      return txHash;
    } catch (e) {
      error(`Error minting token: ${e}`);
      setError(e);
    }
  };

  useEffect(() => {
    try {
      setTokenInstance(new WriteableToken({ document, web3Provider: web3, wallet }));
      setReady()
    } catch (e) {
      error(`Error initialising token: ${e}`);
      setError(e);
    }
  }, [document, web3, wallet]);

  return [state, tokenInstance, mintToken];
};
