import React from "react";
import Link from "next/link";

const GuestPage = () => {
  return (
    <>
      <video autoPlay loop muted>
        <source src={"../videos/waterfall.mp4"} type="video/mp4" />
      </video>
      <Link href="https://docs.yiume.eu" target={"_blank"}>
        [learn more]
      </Link>
    </>
  );
};

export default GuestPage;
