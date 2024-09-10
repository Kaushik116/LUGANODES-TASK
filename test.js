const Web3 = require('web3');
const web3 = new Web3('https://eth-mainnet.alchemyapi.io/v2/pbz7lyt1esrbUciBSh6VVixa_DBrG2TF');

web3.eth.getBlockNumber()
    .then(console.log)
    .catch(console.error);
