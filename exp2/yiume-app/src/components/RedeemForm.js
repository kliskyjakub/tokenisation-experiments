import styles from "@/styles/RedeemForm.module.css";
import React from "react";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import ConstructingBeauty from "../utils/ConstructingBeauty.json";
import DrivenByVolatility from "../utils/DrivenByVolatility.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import Link from "next/link";

const RedeemForm = (params) => {
  const collection = params.data[0];
  const id = params.data[1];
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  };
  const ryskYiumeContractAddress =
    process.env.NEXT_PUBLIC_RYSK_YIUME_CONTRACT_ADDRESS.toLowerCase();
  const ryskHatContractAddress =
    process.env.NEXT_PUBLIC_RYSK_HAT_CONTRACT_ADDRESS.toLowerCase();
  let collectionAddress;
  // TODO: also check whether id is within the range of the collection
  if (collection === "driven-by-volatility") {
    collectionAddress = ryskHatContractAddress;
  } else if (collection === "constructing-beauty") {
    collectionAddress = ryskYiumeContractAddress;
  } else {
    collectionAddress = "invalid";
  }

  const redeemDesign = async (redemptionId) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const abi =
          collectionAddress === ryskYiumeContractAddress
            ? ConstructingBeauty.abi
            : DrivenByVolatility.abi;
        const connectedContract = new ethers.Contract(
          collectionAddress,
          abi,
          signer
        );

        let redeemToken = await connectedContract.redeem(id, redemptionId);
        await redeemToken.wait();
        toast.success("redemption successful!++", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.log("ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      toast.error("error. check console logs for more information", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // generate a unique id for the redemption
    const uniqueId = uuidv4();

    // write data into Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    // todo: make more flexible for non-rysk redemptions
    set(ref(db, "redemptions-rysk/" + uniqueId), {
      collection: collection,
      tokenId: id,
      size: event.target.size.value,
      firstName: event.target.first.value,
      lastName: event.target.last.value,
      address: event.target.address.value,
      city: event.target.city.value,
      country: event.target.country.value,
      zip: event.target.zip.value,
      email: event.target.email.value,
    });

    await redeemDesign(uniqueId);
  };

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
      <form onSubmit={handleSubmit} className={styles.redemption_form}>
        {collection === "constructing-beauty" ? (
          <>CONSTRUCTING BEAUTY</>
        ) : (
          <>DRIVEN BY VOLATILITY</>
        )}
        <br />
        <br />
        <div className={styles.form_group}>token id: {id}</div>
        <div className={styles.form_group}>size:</div>
        <div className={styles.form_group}>
          <select name="size" id="size" className={styles.sizing} required>
            {collection === "constructing-beauty" ? (
              <>
                <option value="s">s</option>
                <option value="m">m</option>
                <option value="l">l</option>
                <option value="xl">xl</option>
                <option value="xxl">xxl</option>
              </>
            ) : (
              <>
                <option value="one-size">one-size</option>
              </>
            )}
          </select>
        </div>
        <div className={styles.form_group}>
          <Link href={"https://docs.yiume.eu/resources/size-chart"} target={"_blank"}>
            (size chart)
          </Link>
        </div>
        <br />
        <div className={styles.form_group}>delivery:</div>
        <div className={styles.form_group}>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="first_name"
            className={styles.single}
            required
            maxLength="30"
          />
          <input
            type="text"
            id="last"
            name="last"
            placeholder="last_name"
            className={styles.single}
            required
            maxLength="30"
          />
        </div>
        <div className={styles.form_group}>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="address"
            className={styles.double}
            required
            maxLength="50"
          />
        </div>
        <div className={styles.form_group}>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="city"
            className={styles.double}
            required
            maxLength="50"
          />
        </div>
        <div className={styles.form_group}>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="country"
            className={styles.single}
            required
            maxLength="50"
          />
          <input
            type="text"
            id="zip"
            name="zip"
            placeholder="zip"
            className={styles.single}
            required
            maxLength="15"
          />
        </div>
        <div className={styles.form_group}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            className={styles.double}
            required
          />
        </div>
        <button type="submit" className={styles.submit_redemption}>
          Submit
        </button>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </form>
    </div>
  );
};

export default RedeemForm;
