import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import styles from "./NewAPI.module.scss";
import { userContext } from "../../../userContext";
import Alert from "../../../utils/Alert/Alert";

//Input textbox styles are imported from this login styles component
// import loginStyles from "../../../pages/LoginSignup/LoginSignupStyles.module.scss";
const NewAPI = ({ updateData, setShowModal }) => {
  // const {isUpdate} = useLocation();
  // const [isOpen, setIsOpen] = useState(true);
  const getAPI = async (id) => {
    try {
      const res = await axios.get(`/api/userAPIs/apis/${id}`);
      console.log(res.data);
      let api = res.data.api;
      setApiName(api.name);
      setDescription(api.description);
      setEndpointFields(api.endpoints);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    if (updateData && updateData.isUpdate) {
      let id = updateData.id;
      getAPI(id);
    }
  }, []);

  const userData = useContext(userContext);
  const [apiName, setApiName] = useState("");
  const [description, setDescription] = useState("");
  const [endpointFields, setEndpointFields] = useState([
    { endpoint: "", description: "" },
  ]);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState({
    display: false,
    success: false,
    message: "",
  });

  let handleChange = (i, e) => {
    let newEndPointFields = [...endpointFields];
    newEndPointFields[i][e.target.name] = e.target.value;
    setEndpointFields(newEndPointFields);
  };

  let addFormFields = () => {
    setEndpointFields([...endpointFields, { endpoint: "", description: "" }]);
  };

  let removeFormFields = (i) => {
    let newEndPointFields = [...endpointFields];
    newEndPointFields.splice(i, 1);
    setEndpointFields(newEndPointFields);
  };
  const addAPI = async () => {
    try {
      const res = await axios.post("/api/userAPIs/apis", {
        id: userData.user.id,
        imageUrl,
        endpoints: endpointFields,
        description,
        name: apiName,
      });
      console.log(res);
      setMessage({
        display: true,
        success: true,
        message: "Successfully, added the API",
      });
    } catch (error) {
      setMessage({
        display: true,
        success: false,
        message: error.response.data.message,
      });
      console.log(error.response.data);
    }
    document.getElementById("alert").scrollIntoView();
  };
  const updateAPI = async (id) => {
    try {
      const res = await axios.put(`/api/userAPIs/apis/${id}`, {
        imageUrl,
        endpoints: endpointFields,
        description,
        name: apiName,
      });
      console.log(res);
      setMessage({
        display: true,
        success: true,
        message: "Successfully, updated the API",
      });
    } catch (error) {
      setMessage({
        display: true,
        success: false,
        message: error.response.data.message,
      });
      console.log(error.response.data);
    }
    document.getElementById("alert").scrollIntoView();
  };
  const handleSubmit = async () => {
    if (updateData && updateData.isUpdate) {
      updateAPI(updateData.id);
    } else {
      addAPI();
    }
  };
  return (
    <div className={styles["modal-box"]}>
      {updateData && updateData.isUpdate && apiName.length < 1 && (
        <div id="preloader"></div>
      )}
      <div id="new-api-modal" className={styles["modal"]}>
        <div className={styles["modal-dialog"]}>
          <div className={styles["modal-content"]}>
            <Alert
              id="alert"
              setMessage={setMessage}
              display={message.display}
              success={message.success}
              message={message.message}
            />
            <span
              onClick={() => {
                setShowModal(false);
              }}
              className={styles["close-button"]}
            >
              &times;
            </span>
            <h4>
              {updateData && updateData.isUpdate ? "Update API" : "Add new API"}
            </h4>

            <input
              type="text"
              name="apiName"
              id=""
              placeholder="API Name"
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
            />
            <input
              type="text"
              name="description"
              id=""
              placeholder="Short Description of the API"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              name="imageUrl"
              id=""
              placeholder="Enter the image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <br />
            {endpointFields.map((element, index) => (
              <div key={index}>
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
              </div>
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
            <input
              type="submit"
              onClick={() => handleSubmit()}
              value={
                updateData && updateData.isUpdate ? "Update API " : "Add API"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAPI;
