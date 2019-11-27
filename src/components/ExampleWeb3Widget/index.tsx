import React, { ReactElement } from "react";
import { Web3Context } from "../../contexts/Web3Context";

export class Web3EnabledWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render(): ReactElement {
    return (
      <Web3Context.Consumer>
        {({ web3 }) => {
          return <Widget web3={web3} />;
        }}
      </Web3Context.Consumer>
    );
  }
}

class Widget extends React.Component {
  constructor(props: { web3: any }) {
    super(props);

    this.state = {
      currentBlockNumber: 0,
      privateKey: "0x01"
    };

    this.handleRefreshBlock.bind(this);
  }

  handleRefreshBlock = async (): Promise<void> => {
    const blockNumber = await this.props.web3.eth.getBlockNumber();
    this.setState({ currentBlockNumber: blockNumber });
  };

  handleCreateWallet = async (): Promise<void> => {
    await this.props.web3.eth.accounts.wallet.add(this.state.privateKey);
  };

  render(): ReactElement {
    return (
      <>
        <p>{this.state.currentBlockNumber}</p>
        <button type="button" className="btn btn-primary" onClick={this.handleRefreshBlock}>
          Test
        </button>
        <button type="button" className="btn btn-primary" onClick={this.handleCreateWallet}>
          Create Wallet
        </button>
      </>
    );
  }
}
