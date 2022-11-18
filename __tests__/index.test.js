import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from "../src/pages/index";

import { Web3Context } from "../src/features/web3/Web3Provider";
import { WalletContext } from "../src/features/wallet/WalletProvider";
import { getWalletProviderMock } from "../__mocks__/WalletProviderMock";
import { getWeb3ProviderMock } from "../__mocks__/Web3ProviderMock";

const storageMock = {
  setItem: jest.fn(),
  getItem: jest.fn(() => null),
};

const customRender = (web3Mock, walletMock) =>
  render(
    <Web3Context.Provider value={web3Mock}>
      <WalletContext.Provider value={walletMock}>
        <Home />
      </WalletContext.Provider>
    </Web3Context.Provider>
  );

describe("Home", () => {
  it("wallets are rendering", async () => {
    const walletMock = getWalletProviderMock({
      wallets: [
        {
          address: "0x72F24362c4338523e66A29133e1CF4cF825A2544",
          privateKey: "privateKey1",
        },
        {
          address: "0x84641155218828808343888D3DDC03E1bC70aA3c",
          privateKey: "privateKey2",
        },
      ],
    });

    act(() => customRender(getWeb3ProviderMock(), walletMock));

    await waitFor(() => {
      const wallet1 = screen.getByText(
        "0x72F24362c4338523e66A29133e1CF4cF825A2544"
      );
      const wallet2 = screen.getByText(
        "0x84641155218828808343888D3DDC03E1bC70aA3c"
      );

      const privatKeys = screen.getAllByTestId("private-key");

      // all wallets are shown
      expect(wallet1).toBeInTheDocument();
      expect(wallet2).toBeInTheDocument();
      // private keys are hidden
      expect(privatKeys[0].innerHTML).toBe("*****");
      expect(privatKeys[1].innerHTML).toBe("*****");
    });
  });

  it("show error on wrong password", async () => {
    const walletMock = getWalletProviderMock({
      wallets: [
        {
          address: "0x72F24362c4338523e66A29133e1CF4cF825A2544",
          privateKey: "privateKey1",
        },
        {
          address: "0x84641155218828808343888D3DDC03E1bC70aA3c",
          privateKey: "privateKey2",
        },
      ],
      unlock: () => {
        throw new Error();
      },
    });

    act(() => customRender(getWeb3ProviderMock(), walletMock));

    await waitFor(() => {
      const heading = screen.getByTestId("input");
      const show = screen.getByTestId("show");

      fireEvent.click(show);

      const errMsg = screen.getByText("Wrong password!");

      expect(heading).toBeInTheDocument();
      expect(errMsg).toBeInTheDocument();
    });
  });

  it("if wallet is unlocked then show private keys", async () => {
    const walletMock = getWalletProviderMock({
      locked: false,
      wallets: [
        {
          address: "0x72F24362c4338523e66A29133e1CF4cF825A2544",
          privateKey: "privateKey1",
        },
        {
          address: "0x84641155218828808343888D3DDC03E1bC70aA3c",
          privateKey: "privateKey2",
        },
      ],
    });

    act(() => customRender(getWeb3ProviderMock(), walletMock));

    await waitFor(() => {
      const privatKeys = screen.getAllByTestId("private-key");

      // private keys are hidden
      expect(privatKeys[0].innerHTML).toBe("privateKey1");
      expect(privatKeys[1].innerHTML).toBe("privateKey2");
    });
  });

  it("balance should be shown", async () => {
    const walletMock = getWalletProviderMock({
      locked: false,
      wallets: [
        {
          address: "0x72F24362c4338523e66A29133e1CF4cF825A2544",
          privateKey: "privateKey1",
        },
      ],
    });

    act(() => customRender(getWeb3ProviderMock(), walletMock));

    await waitFor(() => {
      const balanceNode = screen.getByTestId("balance");
      expect(balanceNode).toBeInTheDocument();
    });
  });
});
