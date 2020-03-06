/**
 *  TODO: Extract this code out to its own package to reuse in tradetrust-website
 */

import { WriteableToken } from "@govtechsg/oa-token";

import { getLogger } from "../logger";

import { useState, useContext, useEffect, useCallback } from "react";
import { Web3Context } from "../contexts/Web3Context";
import { WrappedDocument } from "@govtechsg/open-attestation";

const { trace, error } = getLogger("useToken");

interface TransactionState {
  status: TransactionStateStatus;
  error: any;
}

interface UseEthereumTransactionState {
  state: TransactionState;
  setLoading: () => void;
  setNoWallet: () => void;
  setReady: () => void;
  setSuccess: () => void;
  setMining: () => void;
  setError: (e: any) => void;
}

export enum TransactionStateStatus {
  LOADING = "loading",
  READY = "ready",
  SUCCESS = "success",
  NO_WALLET = "no_wallet",
  TRANSACTION_MINING = "transaction-mining",
  ERROR = "error"
}

export const useEthereumTransactionState = (): UseEthereumTransactionState => {
  const [state, setState] = useState<TransactionState>({ status: TransactionStateStatus.LOADING, error: undefined });

  const setLoading = (): void => setState({ status: TransactionStateStatus.LOADING, error: undefined });
  const setNoWallet = (): void => setState({ status: TransactionStateStatus.NO_WALLET, error: undefined });
  const setReady = (): void => setState({ status: TransactionStateStatus.READY, error: undefined });
  const setSuccess = (): void => setState({ status: TransactionStateStatus.SUCCESS, error: undefined });
  const setMining = (): void => setState({ status: TransactionStateStatus.TRANSACTION_MINING, error: undefined });

  const setError = (e: any): void => setState({ status: TransactionStateStatus.ERROR, error: e.message });

  return { state, setLoading, setNoWallet, setReady, setSuccess, setMining, setError };
};

type UseToken = [TransactionState, WriteableToken | null, MintToken];
type MintToken = (beneficiary: string, holder: string) => Promise<any>;

export const useToken = ({ document }: { document: WrappedDocument<any> }): UseToken => {
  trace(`document to initialize ${JSON.stringify(document)}`);

  const [tokenInstance, setTokenInstance] = useState<WriteableToken | null>(null);
  const { state, setReady, setMining, setError, setSuccess } = useEthereumTransactionState();
  const { web3, wallet } = useContext(Web3Context);

  const setErrorCallback = useCallback(setError, []);
  const setReadyCallback = useCallback(setReady, []);

  const mintToken: MintToken = async (beneficiary: string, holder: string): Promise<string | void> => {
    trace(`Minting to b: ${beneficiary}, h: ${holder}`);
    try {
      if (!tokenInstance) {
        throw new Error(`Token is not initialised`);
      }
      setMining();
      const txHash = await tokenInstance.mintToEscrow(beneficiary, holder);
      setSuccess();
      return txHash;
    } catch (e) {
      error(`Error minting token: ${e}`);
      setError(e);
    }
  };

  useEffect(() => {
    try {
      setTokenInstance(new WriteableToken({ document, web3Provider: web3, wallet }));
      setReadyCallback();
    } catch (e) {
      error(`Error initialising token: ${e}`);
      setErrorCallback(e);
    }
  }, [document, web3, wallet, setReadyCallback, setErrorCallback]);

  return [state, tokenInstance, mintToken];
};
