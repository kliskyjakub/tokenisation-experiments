import styles from "@/styles/WalletButton.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const WalletButton = () => {
  return (
    <div className={styles.container}>
      <ConnectButton
        showBalance={false}
        accountStatus={"address"}
        label={"connect wallet"}
      />
    </div>
  );
};

export default WalletButton;
