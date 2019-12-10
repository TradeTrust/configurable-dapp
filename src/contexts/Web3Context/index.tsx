import React, { ReactElement } from "react";
import Web3 from "web3";
import { ethers } from "ethers";

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
  constructor(props) {
    super(props);
    this.state = {
      web3: undefined,
      setWeb3: web3 => {
        this.setState(prevState => {
          return { ...prevState, web3 };
        });
      },
      setWallet: async (walletEncryptedJson: EncryptedJsonWallet, password: string) => {
        const wallet = await ethers.Wallet.fromEncryptedJson(JSON.stringify(walletEncryptedJson), password);
        this.setState(prevState => {
          return { ...prevState, wallet };
        });
      }
    };
  }

  componentDidMount(): void {
    if (window.ethereum) {
      this.setWeb3(new Web3(window.ethereum));
    }

    if (window.web3) {
      this.setWeb3(new Web3(window.web3.currentProvider));
    }
  }

  setWeb3(web3Provider: any): void {
    this.setState({ web3: web3Provider });
  }

  render(): ReactElement {
    return <Web3Context.Provider value={this.state}>{this.props.children}</Web3Context.Provider>;
  }
}
