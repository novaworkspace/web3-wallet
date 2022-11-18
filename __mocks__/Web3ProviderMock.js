import merge from "lodash.merge";
import Web3 from "web3";

const web3 = new Web3();

export const getWeb3ProviderMock = (assign) => {
  const baseMock = {
    web3: {
      eth: {
        getBalance: jest.fn(async () => "10000000000000000"),
        accounts: {
          create: jest.fn(),
          wallet: {
            add: jest.fn(),
            save: jest.fn(),
            length: 0,
            0: {},
          },
        },
      },
      utils: web3.utils,
    },
  };

  return merge(baseMock, assign);
};
