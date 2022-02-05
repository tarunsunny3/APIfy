import React, { useEffect } from "react";
import styles from "./AlertStyles.module.scss";
const Alert = ({ display, success, message, setMessage }) => {
 
  if (!display) {
    console.log("Yeahh");
    return null;
  }
  return (
    <div>
      {display && (
        <div id="alert" className={styles["alert-box"]}>
          <p className={styles["close-icon"]} onClick={() => setMessage({success, message, display: false})}>
            <i className="fas fa-window-close"></i>
          </p>
          <div
            className={
              styles["message-body"] +
              " " +
              (success ? styles["success"] : styles["error"])
            }
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
