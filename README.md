# configurable-dapp



### Wallet for Testing

The wallet in `src/test/fixture/config.json` was generated using the following snippet:

```javascript
const ethers = require('ethers')
const wallet = ethers.Wallet.createRandom()
wallet.encrypt("password", { scrypt: { N: 1 } }).then(console.log)
```

This creates a randomised wallet and then encrypts it using the password, "password". The scrypt N parameter is set to 1 so that the decryption process is near-instantaneous for the purposes of development and testing.

**DO NOT** use this for production wallet! 