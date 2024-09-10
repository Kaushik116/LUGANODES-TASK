web3.eth.subscribe('logs', { address: beaconDepositContract }, (error, result) => {
    if (error) {
      console.error('Subscription error:', error);
    } else {
      console.log('Log received:', result);
    }
  });
  