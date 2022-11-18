import { useBalance } from "../hooks/useBalance";
import s from "./WalletCard.module.css";

export function WalletCard({ address, locked, privateKey }) {
  const balance = useBalance(address);

  return (
    <div data-testid="wallet-card" className={s.card}>
      <div>
        Wallet address: <span>{address}</span>
      </div>
      <div>
        Private Key:{" "}
        <span data-testid="private-key">{locked ? "*****" : privateKey}</span>
      </div>
      <div>
        Balance: <span data-testid="balance">{balance.value}</span>
      </div>
    </div>
  );
}
