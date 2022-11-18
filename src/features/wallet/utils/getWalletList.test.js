import { getWalletList } from "./getWalletList";

const Web3WalletsObject = {
  length: 2,
  0: {
    address: "0x72F24362c4338523e66A29133e1CF4cF825A2544",
  },
  1: {
    address: "0x84641155218828808343888D3DDC03E1bC70aA3c",
  },
};

describe("getWalletList", () => {
  it("there are should the same length", () => {
    const list = getWalletList(Web3WalletsObject);
    expect(list.length).toBe(Web3WalletsObject.length);
  });

  it("should return the array", () => {
    const list = getWalletList(Web3WalletsObject);
    expect(Array.isArray(list)).toBe(true);
  });
});
