import React from "react";
import Web3 from "web3";

export const Web3Context = React.createContext({
  web3: undefined,
  setWeb3: () => {}
});

export class Web3Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: undefined,
      setWeb3: web3 => {
        this.setState(prevState => {
          return { ...prevState, web3 };
        });
      }
    };
  }

  componentDidMount() {
    if (window.ethereum) {
      this.setWeb3(new Web3(window.ethereum));
    }

    if (window.web3) {
      this.setWeb3(new Web3(window.web3.currentProvider));
    }
  }

  setWeb3(web3Provider) {
    this.setState({ web3: web3Provider });
  }

  render() {
    return <Web3Context.Provider value={this.state}>{this.props.children}</Web3Context.Provider>;
  }
}
