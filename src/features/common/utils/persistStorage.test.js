import { PersistStorage } from "./persistStorage";

describe("getWalletList", () => {
  var storage;
  var mockProvider;

  /* 
    TODO:
    - test other types
    - test expetions
  */

  beforeEach(() => {
    mockProvider = {
      setItem: jest.fn(),
      getItem: jest.fn(() => null),
    };

    storage = new PersistStorage(mockProvider);
  });

  it("should save object as a string", () => {
    storage.save("mykey", { a: 1, b: 2 });
    expect(mockProvider.setItem).toBeCalledWith("mykey", `{\"a\":1,\"b\":2}`);
  });

  it("should return parsed object", () => {
    mockProvider = {
      setItem: jest.fn(),
      getItem: jest.fn(() => `{\"a\":1,\"b\":2}`),
    };

    storage = new PersistStorage(mockProvider);

    const result = storage.load("mykey");
    expect(mockProvider.getItem).toHaveBeenCalled();
    expect(typeof result).toBe("object");
    expect(result.a).toBe(1);
  });
});
