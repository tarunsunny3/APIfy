import React from "react";
import styles from "./NewAPI.module.scss";

//Input textbox styles are imported from this login styles component
import loginStyles from "../../../pages/LoginSignup/LoginSignupStyles.module.scss";
const NewAPI = ({ showAPIModal, setShowAPIModal }) => {
  return (
    <div className={styles["modal-box"]}>
      <div id="new-api-modal" className={styles["modal"]}>
        <div className={styles["modal-content"]}>
          <span
            onClick={() => setShowAPIModal(false)}
            className={styles["close-button"]}
          >
            &times;
          </span>
          <h4>Add new API</h4>
          <input type="text" name="" id="" placeholder="API Name" />
          <br />
          <input type="text" name="" id="" placeholder="API End point" />
          <br />
          <textarea
            type="text"
            name=""
            id=""
            className={styles["description-box"]}
            placeholder="Description of API"
            rows="5"
          />
          <br />
          <input type="submit" value="Add API" />
        </div>
      </div>
    </div>
  );
};

export default NewAPI;
