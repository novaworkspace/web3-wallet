import { Web3Provider, Web3Context } from "src/features/web3/Web3Provider";
import { WalletProvider } from "src/features/wallet/WalletProvider";
import { PersistStorage } from "src/features/common/utils/persistStorage";

import "../styles/global.css";

const persist = typeof window === "undefined" ? {} : localStorage;

export default function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <WalletProvider
        Web3Context={Web3Context}
        storageProvider={new PersistStorage(persist)}
      >
        <Component {...pageProps} />
      </WalletProvider>
    </Web3Provider>
  );
}
