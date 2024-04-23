import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import logo from "../../public/images/sun.gif";
import WalletButton from "./WalletButton";

const Header = () => {
  return (
    <header>
      <div className={styles.logo}>
        <Link href="https://yiume.eu">
          <Image
            src={logo}
            className={styles.gif_invert}
            width={70}
            height={70}
            alt="Rotating yiume logo"
            priority
          />
        </Link>
      </div>
      <div className={styles.navigation}>
        <Link href="/">home</Link>
        <Link href="/products">products</Link>
      </div>
      <WalletButton />
    </header>
  );
};

export default Header;
