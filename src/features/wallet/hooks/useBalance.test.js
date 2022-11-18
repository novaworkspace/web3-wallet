import * as React from "react";
import { renderHook, waitFor } from "@testing-library/react";

import { Web3Context } from "../../web3/Web3Provider";
import { useBalance } from "./useBalance";

import { getWeb3ProviderMock } from "../../../../__mocks__/Web3ProviderMock";

const wrapper = ({ children }) => (
  <Web3Context.Provider value={getWeb3ProviderMock()}>
    {children}
  </Web3Context.Provider>
);

test("increment and decrement updates the count", async () => {
  const { result } = renderHook(() => useBalance(), { wrapper });

  await waitFor(async () => {
    // started request
    expect(result.current.status).toBe("FETCHING");
    // wait
    await new Promise((r) => setTimeout(r, 100));
    // success response
    expect(result.current.status).toBe("SUCCESS");
    // formated from wei
    expect(result.current.value).toBe("0.01");
  });
});
