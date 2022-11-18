export const getWalletList = (web3Wallet) => {
  const wallets = [];

  for (let idx = 0; idx < web3Wallet.length; idx++) {
    const account = web3Wallet[idx];
    wallets.push(account);
  }

  return wallets;
};
