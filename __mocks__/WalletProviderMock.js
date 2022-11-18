import merge from "lodash.merge";

export const getWalletProviderMock = (assign) => {
  const baseMock = {
    private: {
      createWeb3Account: () => {},
      syncWithWeb3Wallets: () => {},
      rehydrate: () => {},
    },
    create: () => {},
    unlock: () => {},
    setSecret: () => {},
    hasSecret: false,
    locked: true,
    wallets: [],
  };

  return merge(baseMock, assign);
};
