import React from "react";
import styles from "./APICardStyles.module.scss";

const APICard = ({ apiImage, apiTitle, apiDescription }) => {
  return (
    <div className={styles["api-card"]}>
      <img src={apiImage} alt="API picture" />
      <p className={styles["api-title"]}>{apiTitle}</p>
      <p className={styles["api-desc"]}>{apiDescription}</p>
    </div>
  );
};

export default APICard;
