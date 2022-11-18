import { useCallback, useState } from "react";
import { useWallet } from "./useWallet";

const STATUS = {
  IDLE: "IDLE",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export function useCreate() {
  const wallet = useWallet();
  const [status, setStatus] = useState(STATUS.IDLE);

  const handleCreate = useCallback(() => {
    if (!wallet.hasSecret) return setStatus(STATUS.ERROR);

    wallet.create();
    setStatus(STATUS.SUCCESS);
  }, [wallet.hasSecret, wallet.unlock]);

  return { status, handleCreate };
}
