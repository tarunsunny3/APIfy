import React from "react";
import styles from "./APIDetailStyles.module.scss";
const APIDetail = ({ api, setShowDetailModal }) => {
  const { name: apiTitle, description: apiDescription, endpoints: apiEndpoints } = api;
  return (
    <div className={styles["container"]}>
      <div id="new-api-modal" className={styles["modal"]}>
        <div className={styles["modal-dialog"]}>
          <div className={styles["modal-content"]}>
          <span
              onClick={() => {
                setShowDetailModal(false);
              }}
              className={styles["close-button"]}
            >
              &times;
            </span>
            <div className={styles["api-title"]}>
              <h1>{apiTitle}</h1>
            </div>
            
            <br />
            <hr />
            <br />
            <h4>{apiDescription}</h4>
            <br />
            <hr />
            <h3>Endpoints: </h3>
            <hr />
            <br />
            {apiEndpoints.map((apiEndpoint, index) => (
              <div key={index}>
                <p>
                  <b>Endpoint {index+1}: </b> {apiEndpoint.endpoint}
                </p>
                <p><b>Method Type:</b> {apiEndpoint.methodType}</p>
                <p><b>Description: </b></p> <pre> {apiEndpoint.description}</pre>
              
                <br />
                <hr />
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDetail;
