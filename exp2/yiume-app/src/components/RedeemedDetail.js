import styles from "@/styles/RedeemForm.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ConstructingBeauty from "../utils/ConstructingBeauty.json";
import DrivenByVolatility from "../utils/DrivenByVolatility.json";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";

const RedeemedDetail = (params) => {
  const collection = params.data[0];
  const id = params.data[1];

  const [redemptionData, setRedemptionData] = useState([]);

  let collectionAddress;
  // TODO: also check whether id is within the range of the collection
  if (collection === "driven-by-volatility") {
    collectionAddress =
      process.env.NEXT_PUBLIC_RYSK_HAT_CONTRACT_ADDRESS.toLowerCase();
  } else if (collection === "constructing-beauty") {
    collectionAddress =
      process.env.NEXT_PUBLIC_RYSK_YIUME_CONTRACT_ADDRESS.toLowerCase();
  } else {
    collectionAddress = "invalid";
  }

  useEffect(() => {
    const getRedemptionData = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const abi =
            collectionAddress ===
            process.env.NEXT_PUBLIC_RYSK_YIUME_CONTRACT_ADDRESS.toLowerCase()
              ? ConstructingBeauty.abi
              : DrivenByVolatility.abi;
          const connectedContract = new ethers.Contract(
            collectionAddress,
            abi,
            signer
          );

          let redemptionData = await connectedContract.redeemed(id);
          setRedemptionData({
            redeemer: redemptionData.redeemer,
            redemptionId: redemptionData.redemptionId,
          });
        } else {
          console.log("ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRedemptionData().catch(console.error);
  }, [collectionAddress, id]);

  return (
    <div className={styles.container}>
      <div className={styles.partnership_info}>
        {/*todo: make more flexible*/}
        {collection === "constructing-beauty" ? (
          <>
            <Image
              src="/images/ryskYiume.svg"
              alt="rysk x yiume merch design"
              width={300}
              height={166}
              priority
            />
            rysk x yiume
            <br />
            <br />
            <br />
            100% cotton
            <br />
            screen print
            <br />
            no returns
            <br />
          </>
        ) : (
          <>
            <Image
              src="/images/drivenByVolatility.webp"
              alt="rysk trading competition hat"
              width={300}
              height={300}
              priority
            />
            rysk trading competition hat
            <br />
            <br />
            <br />
            corduroy
            <br />
            embroidered
            <br />
            no returns
            <br />
          </>
        )}
      </div>
      <div>
        {collection === "constructing-beauty" ? (
          <>CONSTRUCTING BEAUTY</>
        ) : (
          <>DRIVEN BY VOLATILITY</>
        )}
        <br />
        <br />
        token id: {id}
        <br />
        <br />
        redeemed by:
        <br />
        {redemptionData.redeemer}
        <br />
        <br />
        redemption id:
        <br />
        {redemptionData.redemptionId}
        <br />
      </div>
    </div>
  );
};

export default RedeemedDetail;
