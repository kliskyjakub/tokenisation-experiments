import styles from "@/styles/Footer.module.css";
import React from "react";
import twitter from "../../public/images/twitter.webp";
import discord from "../../public/images/discord.webp";
import mirror from "../../public/images/mirror.webp";
import gitbook from "../../public/images/gitbook.webp";
import opensea from "../../public/images/opensea.webp";
import SectionSeparator from "./SectionSeparator";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <SectionSeparator />
      <div className={styles.container}>
        <Link href="https://twitter.com/yium_e" target="_blank">
          <Image
            src={twitter}
            className={styles.social}
            height="20"
            alt="Twitter link"
          />
        </Link>
        <Link href="https://discord.gg/r6tPQDUZA7" target="_blank">
          <Image
            src={discord}
            className={styles.social}
            height="20"
            alt="Discord link"
          />
        </Link>
        <Link
          href="https://mirror.xyz/0x5094e2aAf34C608FAbC482eb7E1d1474dfDE0ad4/DUlCTYB__-XcXny7aA8TWp9Mb_J9pZiH7zs8JWhxZK0"
          target="_blank"
        >
          <Image
            src={mirror}
            className={styles.social}
            height="20"
            alt="Mirror link"
          />
        </Link>
        <Link href="https://docs.yiume.eu" target="_blank">
          <Image
            src={gitbook}
            className={styles.social}
            height="20"
            alt="Gitbook link"
          />
        </Link>
        <Link href="https://opensea.io/collection/yiume-first" target="_blank">
          <Image
            src={opensea}
            className={styles.social}
            height="20"
            alt="Opensea link"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
