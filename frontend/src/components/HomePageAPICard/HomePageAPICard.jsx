// import axios from "axios";
import React, {useState, useEffect} from "react";
import APIDetail from "../APIDetail/APIDetail";
import styles from "./HomePageAPICardStyles.module.scss";

const HomePageAPICard = (props) => {
  const {api} = props;
  let apiTitle=  "", apiImage= "", apiDescription="", miniApp;
  if(api != undefined){
    apiTitle = api.name;
    apiDescription = api.description;
    miniApp = api.miniApp;
    apiImage = api.imageUrl;
  }else{
    apiTitle = props.apiTitle;
    apiDescription = props.apiDescription;
    miniApp = props.miniApp;
    apiImage = props.apiImage;
  }
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
  // const handleDelete = async  () => {
  //   console.log("Key is " + id);
  //   const res = await axios.delete(`/apis/${id}`);
  //   console.log(res);
  // };
  return (
    <div className={styles["api-card"]}>
       {
        showDetailModal && <APIDetail setShowDetailModal={setShowDetailModal} api={api} />
       }
      {/* <p className={`${styles['icon']} ${styles["close-icon"]}`} onClick={() => handleDelete(id)}>
        <i className="fas fa-window-close"></i>
      </p>
      <p className={`${styles['icon']} ${styles["edit-icon"]}`} onClick={() => handleEdit(id)}>
        <i className="fas fa-edit"></i>
      </p> */}
      <img src={apiImage || "/api_logo.png"} alt="API picture" />
      <p className={styles["api-title"]}>{apiTitle}</p>
      <p className={styles["api-desc"]}>{apiDescription}</p>
      {
        !miniApp
      &&
      <div className={styles["btn-div"]}>
        <button
          onClick={() => setShowDetailModal(true)}
          className={styles["more-button"]}
        >
          More
        </button>
    </div>
  }
    </div>
  );
};

export default HomePageAPICard;
