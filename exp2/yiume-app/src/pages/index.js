import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Dashboard from "@/components/Dashboard";
import GuestPage from "@/components/GuestPage";

export default function Home() {
  const currentAccount = useAccount();
  const [content, setContent] = useState([]);

  useEffect(() => {
    // check if the user is logged in
    !currentAccount.address
      ? setContent(<GuestPage />)
      : setContent(<Dashboard />);
  }, [currentAccount.address]);

  return (
    <>
      <Head>
        <title>yiume</title>
      </Head>
      <main>{content}</main>
    </>
  );
}
