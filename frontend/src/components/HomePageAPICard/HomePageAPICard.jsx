// import axios from "axios";
import React from "react";
import styles from "./HomePageAPICardStyles.module.scss";

const HomePageAPICard = ({ apiImage, apiTitle, apiDescription }) => {
  // const handleDelete = async  () => {
  //   console.log("Key is " + id);
  //   const res = await axios.delete(`/apis/${id}`);
  //   console.log(res);
  // };
  return (
    <div className={styles["api-card"]}>
      {/* <p className={`${styles['icon']} ${styles["close-icon"]}`} onClick={() => handleDelete(id)}>
        <i className="fas fa-window-close"></i>
      </p>
      <p className={`${styles['icon']} ${styles["edit-icon"]}`} onClick={() => handleEdit(id)}>
        <i className="fas fa-edit"></i>
      </p> */}
      <img src={apiImage} alt="API picture" />
      <p className={styles["api-title"]}>{apiTitle}</p>
      <p className={styles["api-desc"]}>{apiDescription}</p>
    </div>
  );
};

export default HomePageAPICard;
