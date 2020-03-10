# Document Creator

This application's purpose is to serve a platform that is configurable for various TradeTrust issuance workflows.

Configuration can be done by providing a `config file` that is further documented below.

### Creating a config file

**As of current date, this application only supports the `Bill of Lading issuance` workflow, so the following configuration guideline only applies to this.**

The configuration file first needs to instruct the application as to what kind of workflow it is. This can be provided under the "workflow" key.

For a transferable asset issuance, the pre-requisites are:
1. A document template with its associated [form schema](#form-schema)
1. An [ethereum wallet](#wallet-for-testing) with Ethers (for development purposes we are using Ropsten network)
1. An already-deployed instance of [Token Registry](https://openattestation.com/docs/transferable-record/token-registry) that the above wallet has control over
1. A [DNS-TXT record](https://openattestation.com/docs/extension/identity-proofs) that has been set up with the above Token Registry

Please refer to the sample configuration to see where the above data should be filled in.

###### Sample Configuration

This can be found [here](https://github.com/TradeTrust/configurable-dapp/blob/master/src/test/fixture/config.json)

### Form Schema

A form schema defines the fields that can be filled in by the user or uploaded as a pre-populated `.json` data file.

The format of this `.json` file can be referred to [here](https://github.com/rjsf-team/react-jsonschema-form). It is simply a [JSON schema](https://json-schema.org/) with added display customisation fields. Refer to [the React component here](https://docs.tradetrust-renderer.openattestation.com/?path=/story/mdx-jsonschemaform--with-schema-only) for more details.

### Wallet for Testing

The wallet in `src/test/fixture/config.json` was generated using the following snippet:

```javascript
const ethers = require('ethers')
const wallet = ethers.Wallet.createRandom()
wallet.encrypt("password", { scrypt: { N: 1 } }).then(console.log)
```

This creates a randomised wallet and then encrypts it using the password, "password". The scrypt N parameter is set to 1 so that the decryption process is near-instantaneous for the purposes of development and testing.

**DO NOT** use this for production wallet! 

Once you have this wallet, you can request some Ether from any [Ropsten faucet](https://faucet.metamask.io/) for testing.


