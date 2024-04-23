import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import RedeemForm from "@/components/RedeemForm";
import GuestPage from "@/components/GuestPage";
import EmptySection from "@/components/EmptySection";
import { ethers } from "ethers";
import ConstructingBeauty from "@/utils/ConstructingBeauty.json";
import DrivenByVolatility from "@/utils/DrivenByVolatility.json";
import RedeemedDetail from "@/components/RedeemedDetail";

// take in token id and collection address as a param
export default function Redeem(props) {
  const currentAccount = useAccount();
  const [content, setContent] = useState([]);
  const chain = useNetwork();
  const ryskYiumeContractAddress =
    process.env.NEXT_PUBLIC_RYSK_YIUME_CONTRACT_ADDRESS.toLowerCase();
  const ryskHatContractAddress =
    process.env.NEXT_PUBLIC_RYSK_HAT_CONTRACT_ADDRESS.toLowerCase();

  // get collection and id info
  const { collection, id } = props;
  let collectionAddress;
  // TODO: also check whether id is within the range of the collection
  if (collection === "driven-by-volatility") {
    collectionAddress = ryskHatContractAddress;
  } else if (collection === "constructing-beauty") {
    collectionAddress = ryskYiumeContractAddress;
  } else {
    collectionAddress = "invalid";
  }

  // TODO: for both check functions ensure the id passed is within the range of the collection
  const checkIfRedeemed = async () => {
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

        let redeemed = await connectedContract.redeemed(id);
        // check if redeemed0 is empty
        return redeemed[0] !== "";
      } else {
        console.log("ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfOwned = async () => {
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

        let owned = await connectedContract.ownerOf(id);
        // check if owned is empty
        return owned === currentAccount.address;
      } else {
        console.log("ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const hydrate = async () => {
      // check if the user is logged in
      if (!currentAccount.address) {
        setContent(<GuestPage />);
      } else {
        // check if the network is correct
        if (chain.chain.id !== 42161) {
          setContent(<>(wrong network)</>);
        } else {
          if (collectionAddress === "invalid") {
            setContent(<>(invalid collection)</>);
          } else {
            // if you own the token
            if (await checkIfOwned()) {
              // if the token has already been redeemed
              if (await checkIfRedeemed()) {
                setContent(<RedeemedDetail data={[collection, id]} />);
              } else {
                // if the token has not yet been redeemed
                setContent(<RedeemForm data={[collection, id]} />);
              }
            } else {
              setContent(
                <EmptySection
                  content={"this token is not owned by your account"}
                />
              );
            }
          }
        }
      }
    };
    hydrate().catch(console.error);
  }, [
    chain?.id,
    currentAccount.address,
    ryskYiumeContractAddress,
    ryskHatContractAddress,
  ]);

  return (
    <>
      <Head>
        <title>yiume</title>
      </Head>
      <main>{content}</main>
    </>
  );
}

export async function getServerSideProps(context) {
  // extract the collection and id from the context
  const { collection, id } = context.query;
  return {
    props: { collection, id }, // will be passed to the page component as props
  };
}
