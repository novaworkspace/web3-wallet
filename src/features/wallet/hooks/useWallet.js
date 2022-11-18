import { useContext } from "react";
import { WalletContext } from "../WalletProvider";

export function useWallet() {
  const context = useContext(WalletContext);
  return context;
}
