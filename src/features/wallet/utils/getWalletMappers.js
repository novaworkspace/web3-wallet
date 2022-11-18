export const getNonSensitiveWallet = (account) => ({
  address: account.address,
});

export const getSensitiveWallet = (account) => ({
  address: account.address,
  privateKey: account.privateKey,
});
