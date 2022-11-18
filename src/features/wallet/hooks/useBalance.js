import { useCallback, useContext, useEffect, useState } from "react";
import { useWeb3 } from "../../web3/useWeb3";

const STATUS = {
  FETCHING: "FETCHING",
  SUCCESS: "SUCCESS",
};

export function useBalance(address) {
  const web3 = useWeb3();
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState(STATUS.FETCHING);

  const getBalance = useCallback(async () => {
    const balanceWei = await web3.eth.getBalance(address);
    const balance = web3.utils.fromWei(balanceWei);
    setValue(balance);
    setStatus(STATUS.SUCCESS);
  }, [web3, address, setValue, setStatus]);

  useEffect(() => {
    getBalance();
  }, []);

  return {
    refetch: getBalance,
    status,
    value,
  };
}
