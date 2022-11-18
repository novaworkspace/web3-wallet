import { createContext } from "react";
import Web3 from "web3";

export const Web3Context = createContext({});

export function Web3Provider({ children }) {
  var provider = "https://data-seed-prebsc-1-s1.binance.org:8545";
  var web3Provider = new Web3.providers.HttpProvider(provider);
  var web3 = new Web3(web3Provider);

  if (typeof window !== "undefined") {
    window.web3 = web3;
  }

  return (
    <Web3Context.Provider value={{ web3 }}>{children}</Web3Context.Provider>
  );
}
