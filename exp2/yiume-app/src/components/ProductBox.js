import styles from "@/styles/ProductBox.module.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/images/bigSun.gif";

const ProductBox = (props) => {
  const product = props.product;

  if (product.name === "soon") {
    return (
      <div className={styles.product_box}>
        {product.side === "left" ? (
          <div className={styles.product_image}>
            <Image src={logo} alt="yiume logo" className={styles.gif_invert} />
          </div>
        ) : null}
        <div className={styles.product_info}>
          ____ x yiume
          <p>soon</p>
        </div>
        {product.side === "right" ? (
          <div className={styles.product_image}>
            <Image src={logo} alt="yiume logo" className={styles.gif_invert} />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Link href={product.link} target={"_blank"}>
      <div className={styles.product_box}>
        {product.side === "left" ? (
          product.border ? (
            <div className={styles.product_image}>
              <Image
                src={product.image}
                alt={product.alt}
                width={product.width}
                height={product.height}
              />
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.alt}
              width={product.width}
              height={product.height}
            />
          )
        ) : null}
        <div className={styles.product_info}>
          {product.name}
          <p>{product.description}</p>
        </div>
        {product.side === "right" ? (
          product.border ? (
            <div className={styles.product_image}>
              <Image
                src={product.image}
                alt={product.alt}
                width={product.width}
                height={product.height}
              />
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.alt}
              width={product.width}
              height={product.height}
            />
          )
        ) : null}
      </div>
    </Link>
  );
};

export default ProductBox;
