import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserDashboardStyles.module.scss";
import "../../styles/globalStyles.scss";
import APICard from "../../components/APICard/APICard";
import { userContext } from "../../userContext";
import Alert from "../../utils/Alert/Alert";
import NewAPI from "../../components/Navbar/NewAPI/NewAPI";
const UserDashboard = () => {
  const userData = React.useContext(userContext);
  const [showModal, setShowModal] = useState(false);
  const [apis, setAPIs] = useState([]);
  const [updateID, setUpdateID] = useState("");
  const [message, setMessage] = useState({
    display: false,
    success: true,
    message: "",
  });
  const getAPIs = async () => {
    try {
      let userId = userData.user.id;
      let res = await axios.get(`/api/userAPIs/apis/user/${userId}`);
      setAPIs(res.data.apis);
      console.log(res.data.apis);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getAPIs();
  }, []);
  const handleDelete = async (id) => {
    console.log("Key is " + id);
    try {
      const res = await axios.delete(`/api/userAPIs/apis/${id}`);
      console.log(res);
      setMessage({ display: true, success: true, message: res.data.message });
      getAPIs();
    } catch (error) {
      console.log(error.response.data);
      setMessage({
        display: true,
        success: false,
        message: error.response.data.message,
      });
    }
    document.getElementById("alert").scrollIntoView();
  };
  const handleEdit = async (id) => {
    console.log(id);
    setUpdateID(id);
    setShowModal(true);
  };
  return (
    <div>
      {showModal && (
        <NewAPI
          updateData={{ isUpdate: true, id: updateID }}
          setShowModal={setShowModal}
        />
      )}
      {apis.length == 0 ? (
        <div id="preloader"></div>
      ) : (
        <>
          <div id="alert" className={styles["alert-box"]}>
            <Alert
              setMessage={setMessage}
              display={message.display}
              success={message.success}
              message={message.message}
            />
          </div>
          <div className={styles["apis"]}>
            {apis.map((api, index) => (
                <APICard
                  key={index}
                  id={api._id}
                  apiImage={api.imageUrl || "/api_logo.png"}
                  apiTitle={api.name}
                  apiDescription={api.description || "This is a very cool API"}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
