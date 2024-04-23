import styles from "@/styles/Dashboard.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Alchemy, Network } from "alchemy-sdk";
import { useAccount } from "wagmi";
import SectionSeparator from "@/components/SectionSeparator";
import EmptySection from "@/components/EmptySection";
import Link from "next/link";

const Dashboard = () => {
  const currentAccount = useAccount();
  const [ownedYiumeFirst, setOwnedYiumeFirst] = useState([]);
  const [ownedRyskYiume, setOwnedRyskYiume] = useState([]);
  const [ownedRyskHat, setOwnedRyskHat] = useState([]);
  const yiumeFirstContractAddress =
    process.env.NEXT_PUBLIC_YIUME_FIRST_CONTRACT_ADDRESS.toLowerCase();
  const ryskYiumeContractAddress =
    process.env.NEXT_PUBLIC_RYSK_YIUME_CONTRACT_ADDRESS.toLowerCase();
  const ryskHatContractAddress =
    process.env.NEXT_PUBLIC_RYSK_HAT_CONTRACT_ADDRESS.toLowerCase();

  useEffect(() => {
    const getOwnedTokens = async () => {
      const settings = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
        network: Network.ARB_MAINNET,
      };
      const alchemy = new Alchemy(settings);
      const curYiumeFirst = [];
      const curRyskYiume = [];
      const curRyskHat = [];
      const options = {
        contractAddresses: [
          yiumeFirstContractAddress,
          ryskYiumeContractAddress,
          ryskHatContractAddress,
        ],
      };
      await alchemy.nft
        .getNftsForOwner(currentAccount.address, options)
        .then((value) => {
          // for loop through the value and check if the contract address is the same as the one we want
          // if it is, then add it to the array
          // check for both types [divide into nested arrays]
          for (let i = 0; i < value.ownedNfts.length; i++) {
            if (
              value.ownedNfts[i].contract.address === yiumeFirstContractAddress
            ) {
              if (
                !curYiumeFirst.some(
                  (e) => e.tokenId === value.ownedNfts[i].tokenId
                )
              ) {
                curYiumeFirst.push(value.ownedNfts[i]);
              }
            }
            if (
              value.ownedNfts[i].contract.address === ryskYiumeContractAddress
            ) {
              if (
                !curRyskYiume.some(
                  (e) => e.tokenId === value.ownedNfts[i].tokenId
                )
              ) {
                curRyskYiume.push(value.ownedNfts[i]);
              }
            }
            if (
              value.ownedNfts[i].contract.address === ryskHatContractAddress
            ) {
              if (
                !curRyskHat.some(
                  (e) => e.tokenId === value.ownedNfts[i].tokenId
                )
              ) {
                curRyskHat.push(value.ownedNfts[i]);
              }
            }
          }
        });
      setOwnedYiumeFirst(curYiumeFirst);
      setOwnedRyskYiume(curRyskYiume);
      setOwnedRyskHat(curRyskHat);
    };
    getOwnedTokens().catch(console.error);
  }, [
    currentAccount.address,
    yiumeFirstContractAddress,
    ryskYiumeContractAddress,
    ryskHatContractAddress,
  ]);

  return (
    <div className={styles.container}>
      your (yiume.first) collectibles:
      <br />
      <br />
      <br />
      <div className={styles.collectibles_wrapper}>
        {!(Array.isArray(ownedYiumeFirst) && ownedYiumeFirst.length) ? (
          <EmptySection content={"none"} />
        ) : (
          ownedYiumeFirst.map((token, id) => {
            const link =
              "https://opensea.io/assets/arbitrum/" +
              yiumeFirstContractAddress +
              "/" +
              token.tokenId;
            const image = "/images/yiumeFirst/" + token.tokenId + ".webp";
            return (
              <div className={styles.collectible_thumbnail} key={id}>
                <a href={link} target="_blank" rel="noreferrer">
                  <Image
                    src={image}
                    alt={"yiumeFirst"}
                    width={200}
                    height={200}
                  />
                  <br />
                  <br />
                  (yiume.first) #{token.tokenId}
                </a>
                <br />
              </div>
            );
          })
        )}
      </div>
      <SectionSeparator />
      your yiume redeemable designs:
      <br />
      <br />
      <br />
      <div className={styles.collectibles_wrapper_rysk}>
        {!(Array.isArray(ownedRyskYiume) && ownedRyskYiume.length) &&
        !(Array.isArray(ownedRyskHat) && ownedRyskHat.length) ? (
          <EmptySection content={"none"} />
        ) : (
          <>
            {!(Array.isArray(ownedRyskYiume) && ownedRyskYiume.length) ? (
              <EmptySection content={"none"} />
            ) : (
              ownedRyskYiume.map((token, id) => {
                return (
                  <div className={styles.collectible_thumbnail_rysk} key={id}>
                    <Link href={"/redeem/constructing-beauty/" + token.tokenId}>
                      <Image
                        src="/images/ryskYiume.svg"
                        alt="rysk x yiume merch design"
                        width={250}
                        height={140}
                      />
                      constructing beauty #{token.tokenId}
                    </Link>
                    <br />
                  </div>
                );
              })
            )}
            {!(Array.isArray(ownedRyskHat) && ownedRyskHat.length) ? (
              <EmptySection content={"none"} />
            ) : (
              ownedRyskHat.map((token, id) => {
                return (
                  <div className={styles.collectible_thumbnail_rysk} key={id}>
                    <Link
                      href={"/redeem/driven-by-volatility/" + token.tokenId}
                    >
                      <Image
                        src="/images/drivenByVolatility.webp"
                        alt="rysk trading competition hat"
                        width={200}
                        height={200}
                      />
                      driven by volatility #{token.tokenId}
                    </Link>
                    <br />
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
