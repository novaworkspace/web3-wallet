import { useState } from "react";
import { useWallet } from "./useWallet";

const STATUS = {
  IDLE: "IDLE",
  FETCHING: "FETCHING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export function useRestore() {
  const [status, setStatus] = useState(STATUS.IDLE);
  const wallet = useWallet();

  const handleRestore = (secret) => {
    setStatus(STATUS.FETCHING);

    try {
      wallet.unlock(secret);
      setStatus(STATUS.SUCCESS);
    } catch (e) {
      setStatus(STATUS.ERROR);
    }
  };

  return { status, handleRestore };
}
