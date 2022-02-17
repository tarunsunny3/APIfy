import React, { useState, useEffect } from "react";
import APIDetail from "../APIDetail/APIDetail";
import styles from "./APICardStyles.module.scss";

const APICard = ({ handleEdit, handleDelete, api }) => {
  const { apiID, apiImage, apiTitle, apiDescription } = api;
  const [showDetailModal, setShowDetailModal] = useState(false);

  const clickOutside = (e) => {
    const modal = document.getElementById("new-api-modal");
    if (e.target == modal) {
      setShowDetailModal(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", clickOutside);
  }, []);
  return (
    <div className={styles["api-card"]}>
      {showDetailModal && <APIDetail api={api} />}
      <p
        className={`${styles["icon"]} ${styles["close-icon"]}`}
        onClick={() => handleDelete(apiID)}
      >
        <i className="fa fa-trash" aria-hidden="true"></i>
      </p>
      <p
        className={`${styles["icon"]} ${styles["edit-icon"]}`}
        onClick={() => handleEdit(apiID)}
      >
        <i className="fas fa-edit"></i>
      </p>
      <img src={apiImage} alt="API picture" />
      <p className={styles["api-title"]}>{apiTitle}</p>
      <p className={styles["api-desc"]}>{apiDescription}</p>
      <div className={styles["btn-div"]}>
        <button
          onClick={() => setShowDetailModal(true)}
          className={styles["more-button"]}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default APICard;
