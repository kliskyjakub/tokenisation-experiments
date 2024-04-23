import React from "react";
import styles from "@/styles/Products.module.css";
import SectionSeparator from "@/components/SectionSeparator";
import yiumeFirst from "/public/images/galaxy.webp";
import constructingBeauty from "/public/images/ryskYiume.svg";
import drivenByVolatility from "/public/images/drivenByVolatility.webp";
import Head from "next/head";
import ProductBox from "@/components/ProductBox";

const products = {
  yiumeFirst: {
    side: "left",
    name: "(yiume.first)",
    description: "the og collection",
    image: yiumeFirst,
    alt: "(yiume.first) collection image",
    height: 200,
    width: 200,
    border: true,
    link: "https://opensea.io/collection/yiume-first",
  },
  constructingBeauty: {
    side: "right",
    name: "constructing beauty",
    description: "rysk x yiume",
    image: constructingBeauty,
    alt: "rysk x yiume merch design",
    height: 140,
    width: 250,
    border: false,
    link: "https://opensea.io/collection/constructing-beauty",
  },
  tradingCompHat: {
    side: "left",
    name: "driven by volatility",
    description: "rysk trading competition hat",
    image: drivenByVolatility,
    alt: "rysk trading competition hat",
    height: 220,
    width: 220,
    border: false,
    link: "https://opensea.io/collection/driven-by-volatility",
  },
  soon: {
    name: "soon",
    side: "right",
  },
};

const Products = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>yiume</title>
      </Head>
      <ProductBox product={products.yiumeFirst} />
      <SectionSeparator />
      <ProductBox product={products.constructingBeauty} />
      <SectionSeparator />
      <ProductBox product={products.tradingCompHat} />
      <SectionSeparator />
      <ProductBox product={products.soon} />
    </div>
  );
};

export default Products;
