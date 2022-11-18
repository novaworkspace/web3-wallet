import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Web3Context } from "../web3/Web3Provider";
import { getWalletList } from "./utils/getWalletList";
import {
  getNonSensitiveWallet,
  getSensitiveWallet,
} from "./utils/getWalletMappers";

export const WalletContext = createContext({
  private: {
    createWeb3Account: () => {},
    syncWithWeb3Wallets: () => {},
    rehydrate: () => {},
  },
  create: () => {},
  unlock: () => {},
  setSecret: () => {},
  hasSecret: false,
  locked: true,
  wallets: [],
});

const localStorageKey = "keystore";

export function WalletProvider({ storageProvider, children }) {
  const { web3 } = useContext(Web3Context);
  const [locked, setLocked] = useState(true);
  const [secret, setSecret] = useState(null);
  const [cache, setCache] = useState([]);

  const create = () => {
    createWeb3Account();
    syncWithWeb3Wallets();
  };

  const createWeb3Account = useCallback(() => {
    // generate a new account
    const account = web3.eth.accounts.create();
    // add account to web3 in-memory storage
    web3.eth.accounts.wallet.add(account);
    // update web3 keystore (localStorage)
    web3.eth.accounts.wallet.save(secret);
    // update keystore
    return account;
  }, [web3, secret]);

  const syncWithWeb3Wallets = useCallback(() => {
    // get current list of wallets
    const accounts = getWalletList(web3.eth.accounts.wallet);
    // update in-memory cache
    setCache(accounts);
    // prepare wallets to store
    const wallets = accounts.map(getNonSensitiveWallet);
    // save non sensetive wallets to storage by rehydration purpose
    storageProvider.save(localStorageKey, wallets);
  }, [setCache, storageProvider]);

  // pre-load keystore from local storage
  const rehydrate = useCallback(() => {
    const cache = storageProvider.load(localStorageKey);
    if (cache) setCache(cache);
  }, [setCache, storageProvider]);

  const unlock = useCallback(
    (secret) => {
      web3.eth.accounts.wallet.load(secret);
      setLocked(false);
      setSecret(secret);
      syncWithWeb3Wallets();
    },
    [web3, setLocked, setSecret, syncWithWeb3Wallets]
  );

  const wallets = useMemo(() => {
    if (locked) {
      return cache.map(getNonSensitiveWallet);
    } else {
      return cache.map(getSensitiveWallet);
    }
  }, [cache, locked]);

  useEffect(() => {
    rehydrate();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        private: {
          createWeb3Account,
          syncWithWeb3Wallets,
          rehydrate,
        },
        create,
        unlock,
        setSecret,
        hasSecret: !!secret,
        locked,
        wallets,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
