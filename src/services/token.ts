import { WriteableToken, TokenRegistry } from "@govtechsg/oa-token";
import { SignedDocument } from "@govtechsg/decentralized-renderer-react-components";
import { getLogger } from "../logger";
import { Wallet, ethers } from "ethers";

const { trace } = getLogger("saga:tokenService");

interface InitializeTokenInterface {
  document: SignedDocument<any>;
  web3Provider: ethers.providers.BaseProvider | undefined;
  wallet: Wallet | undefined;
}

let tokenInstance: TokenRegistry;

export const initializeTokenInstance = async ({
  document,
  web3Provider = undefined,
  wallet = undefined
}: InitializeTokenInterface): Promise<void> => {
  trace(`web3 provider is: ${web3Provider} and wallet is: ${wallet}`);
  if (!document || !web3Provider || !wallet) throw new Error("Can not initialize the token instance");
  tokenInstance = await new WriteableToken({ document, web3Provider, wallet });
  trace(`token Instance: ${tokenInstance}`);
};

export const mintToken = async (document: SignedDocument<any>, newOwner: string): Promise<void> => {
  trace(`new address to mint is: ${newOwner}`);
  await tokenInstance.mint(document, newOwner);
};
