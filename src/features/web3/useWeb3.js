import { useContext } from "react";
import { Web3Context } from "./Web3Provider";

export function useWeb3() {
  const { web3 } = useContext(Web3Context);
  return web3;
}
