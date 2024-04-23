import React from "react";
import styles from "@/styles/EmptySection.module.css";

const EmptySection = (props) => {
  return (
    <>
      <div className={styles.none}>
        <video autoPlay loop muted>
          <source src={"/videos/none.mp4"} type="video/mp4" />
        </video>
        {props.content}
      </div>
    </>
  );
};

export default EmptySection;
