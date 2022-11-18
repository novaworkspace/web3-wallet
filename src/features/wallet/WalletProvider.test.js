import React, { createContext } from "react";
import { render, waitFor, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { Web3Context } from "../web3/Web3Provider";
import { WalletProvider } from "./WalletProvider";
import { useWallet } from "./hooks/useWallet";

import { getWeb3ProviderMock } from "../../../__mocks__/Web3ProviderMock";

describe("WalletProvider", () => {
  const web3Mock = getWeb3ProviderMock();

  const storageMock = {
    save: jest.fn(),
    load: jest.fn(() => null),
  };

  const wrapper = ({ children }) => (
    <Web3Context.Provider value={web3Mock}>
      <WalletProvider storageProvider={storageMock}>{children}</WalletProvider>
    </Web3Context.Provider>
  );

  describe("when create an Web3 account", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useWallet(), { wrapper });

      act(() => {
        result.current.private.createWeb3Account();
      });
    });

    it("it should be created", () => {
      expect(web3Mock.web3.eth.accounts.create).toHaveBeenCalled();
    });

    it("it should be added to wallet", () => {
      expect(web3Mock.web3.eth.accounts.wallet.add).toHaveBeenCalled();
    });

    it("wallet should be saved", () => {
      expect(web3Mock.web3.eth.accounts.wallet.save).toHaveBeenCalled();
    });
  });

  describe("when sync with Web3 Wallet", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useWallet(), { wrapper });

      act(() => {
        result.current.private.syncWithWeb3Wallets();
      });
    });

    it("storage should be called", () => {
      expect(storageMock.save).toHaveBeenCalled();
    });
  });

  describe("when sync with Web3 Wallet", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useWallet(), { wrapper });

      act(() => {
        result.current.private.syncWithWeb3Wallets();
      });
    });

    it("storage should be called", () => {
      expect(storageMock.save).toHaveBeenCalled();
    });
  });
});
