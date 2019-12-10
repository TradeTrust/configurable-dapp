import React, { ReactElement } from "react";
import { ethers, providers } from "ethers";
import { getWeb3FromEnvironment } from "./utils";
import { getLogger } from "../../logger"

const { trace } = getLogger("Web3Context")

export interface web3ContextProps {
  web3: ethers.providers.BaseProvider,
  wallet: ethers.Wallet,
  setWeb3: (web3: ethers.providers.Web3Provider) => {},
  setWallet: (wallet: ethers.Wallet) => {}
}

export const Web3Context = React.createContext({
  web3: undefined,
  wallet: undefined,
  setWeb3: () => {},
  setWallet: () => {}
});

interface EncryptedJsonWallet {
  // commonplace web3 encrypted wallet object shape, geth parity etc
  address: string;
  id: string;
  version: number;
  Crypto: {
    cipher: string;
    cipherparams: {
      iv: string;
    };
    ciphertext: string;
    kdf: string;
    kdfparams: {
      salt: string;
      n: number;
      dklen: number;
      p: number;
      r: number;
    };
    mac: string;
  };
}
export class Web3Provider extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      web3: undefined,
      setWeb3: (web3: providers.BaseProvider) => {
        this.setState(prevState => {
          return { ...prevState, web3 };
        });
      },
      setWallet: async (walletEncryptedJson: EncryptedJsonWallet, password: string) => {
        const decryptedWallet = await ethers.Wallet.fromEncryptedJson(JSON.stringify(walletEncryptedJson), password);
        const wallet = await decryptedWallet.connect(this.state.web3)
        this.setState(prevState => {
          return { ...prevState, wallet };
        });
      }
    };
  }

  componentDidMount(): void {
    const windowWeb3 = getWeb3FromEnvironment();

    if (windowWeb3) {
      trace(`Got web3 on context mount:`, windowWeb3)
      this.setWeb3(windowWeb3)
    }
  }

  setWeb3(web3Provider: providers.BaseProvider): void {
    this.setState({ web3: web3Provider });
  }

  render(): ReactElement {
    return <Web3Context.Provider value={this.state}>{this.props.children}</Web3Context.Provider>;
  }
}
