import Head from "next/head";
import { useCallback, useState } from "react";

import { useWallet } from "../features/wallet/hooks/useWallet";
import { useRestore } from "../features/wallet/hooks/useRestore";

import { WalletCard } from "../features/wallet/component/WalletCard";

import s from "./index.module.css";
import { useCreate } from "../features/wallet/hooks/useCreate";

export default function Home() {
  const { wallets, setSecret, hasSecret, locked } = useWallet();
  const [inputValue, setInputValue] = useState("");

  const restore = useRestore();
  const create = useCreate();

  const hasWallets = !!wallets.length;

  console.log("wallets render", wallets, hasSecret);

  const handleInputChange = useCallback(
    (e) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  const handleUpdateSecret = useCallback(
    (e) => {
      setSecret(inputValue);
    },
    [setSecret, inputValue]
  );

  return (
    <div>
      <Head>
        <title>Web3 Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!hasWallets && !hasSecret && (
        <div className={s.card}>
          <div style={{ marginBottom: 16 }}>Setup your secret</div>
          <input
            placeholder="password"
            data-testid="input"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            id="saveButton"
            data-testid="show"
            onClick={handleUpdateSecret}
          >
            Save
          </button>
        </div>
      )}

      {hasSecret && (
        <div className={s.card}>
          <button
            id="createButton"
            data-testid="show"
            onClick={create.handleCreate}
          >
            Create a wallet
          </button>
          {create.status === "ERROR" && (
            <div className={s.error} style={{ marginTop: 8 }}>
              Setup the password
            </div>
          )}
        </div>
      )}

      {hasWallets && (
        <div className={s.card}>
          {!hasSecret && <input
            placeholder="password"
            data-testid="input"
            value={inputValue}
            onChange={handleInputChange}
          />}
          <button
            id="showButton"
            data-testid="show"
            onClick={() => restore.handleRestore(inputValue)}
          >
            Show private keys
          </button>
          {restore.status === "ERROR" && (
            <div className={s.error} style={{ marginTop: 8 }}>
              Wrong password!
            </div>
          )}
        </div>
      )}

      <div>
        {wallets.map((w) => {
          return (
            <WalletCard
              key={w.address}
              locked={locked}
              address={w.address}
              privateKey={w.privateKey}
            />
          );
        })}
      </div>
    </div>
  );
}
