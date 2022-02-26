import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserDashboardStyles.module.scss";
import "../../styles/globalStyles.scss";
import APICard from "../../components/APICard/APICard";
import { userContext } from "../../userContext";
import Alert from "../../utils/Alert/Alert";
import NewAPI from "../../components/Navbar/NewAPI/NewAPI";
import Pagination from "../../utils/Pagination/Pagination";
const UserDashboard = () => {
  const userData = React.useContext(userContext);
  const [currPage, setCurrPage] = useState(1);
  const [apisPerPage, setApisPerPage] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apis, setAPIs] = useState([]);
  const [updateID, setUpdateID] = useState("");
  const [message, setMessage] = useState({
    display: false,
    success: true,
    message: "",
  });
  const clickOutside = (e) => {
    const modal = document.getElementById("new-api-modal");
    if (e.target == modal) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", clickOutside);
  }, []);
  const getAPIs = async () => {
    try {
      let userId = userData.user.id;
      let res = await axios.get(`/api/userAPIs/apis/user/${userId}`);
      setAPIs(res.data.apis);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getAPIs();
  }, []);
  const handleDelete = async (id) => {
    if (!confirm("Are you sure, you want to delete this API?")) return;
    console.log("Key is " + id);
    try {
      const res = await axios.delete(`/api/userAPIs/apis/${id}`);
      console.log(res);
      setMessage({ display: true, success: true, message: res.data.message });
      setTimeout(() => {
        history.go(0);
      }, 1000);
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
  const indexOfLastJob = currPage * apisPerPage;
  const indexOfFirstJob = indexOfLastJob - apisPerPage;
  let currAPIs = [];
  //Get current Jobs to be displayed on that particular page
  if (indexOfFirstJob >= apis.length) {
    currAPIs = apis;
  } else {
    currAPIs = apis.slice(indexOfFirstJob, indexOfLastJob);
  }

  return (
    <div>
      {showModal && (
        <NewAPI
          getAPIs={getAPIs}
          updateData={{ isUpdate: true, id: updateID }}
          setShowModal={setShowModal}
        />
      )}
      {loading ? (
        <div id="preloader"></div>
      ) : (
        <>
          {apis != null && apis.length === 0 ? (
            <p>There are no APIS....</p>
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
                {currAPIs.map((api, index) => (
                  <APICard
                    key={index}
                    api={api}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                ))}
              </div>
              {apis.length > apisPerPage && (
                <div className={styles["pagination"]}>
                  <Pagination
                    count={Math.ceil(apis.length / apisPerPage)}
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboard;
