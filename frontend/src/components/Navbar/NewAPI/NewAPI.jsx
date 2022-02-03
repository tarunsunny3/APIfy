import React, { useState } from "react";
import styles from "./NewAPI.module.scss";

//Input textbox styles are imported from this login styles component
// import loginStyles from "../../../pages/LoginSignup/LoginSignupStyles.module.scss";
const NewAPI = ({ showAPIModal, setShowAPIModal }) => {
  const [endpointFields, setEndpointFields] = useState([
    { endpoint: "", description: "" },
  ]);
  let handleChange = (i, e) => {
    let newEndPointFields = [...endpointFields];
    newEndPointFields[i][e.target.name] = e.target.value;
    setEndpointFields(newEndPointFields);
  };

  let addFormFields = () => {
    setEndpointFields([...endpointFields, { name: "", email: "" }]);
  };

  let removeFormFields = (i) => {
    let newEndPointFields = [...endpointFields];
    newEndPointFields.splice(i, 1);
    setEndpointFields(newEndPointFields);
  };
  return (
    <div className={styles["modal-box"]}>
      <div id="new-api-modal" className={styles["modal"]}>
        <div className={styles["modal-dialog"]}>
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
            {endpointFields.map((element, index) => (
              <>
                <input
                  type="text"
                  name="endpoint"
                  value={element.endpoint || ""}
                  onChange={(e) => handleChange(index, e)}
                  id=""
                  placeholder="API End point"
                />

                <br />
                <textarea
                  type="text"
                  name="description"
                  id=""
                  value={element.description || ""}
                  onChange={(e) => handleChange(index, e)}
                  className={styles["description-box"]}
                  placeholder="Description of API"
                  rows="5"
                />
                {index ? (
                  <button
                    type="button"
                    className="button remove"
                    onClick={() => removeFormFields(index)}
                  >
                    Remove
                  </button>
                ) : null}

                <br />
              </>
            ))}
            <p>
              Add one more endpoint? &nbsp;
              <span>
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => addFormFields()}
                  className="fa fa-plus"
                  aria-hidden="true"
                ></i>
              </span>
            </p>
            <input type="submit" value="Add API" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAPI;
