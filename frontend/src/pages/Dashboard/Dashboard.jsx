import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HomePageAPICard from "../../components/HomePageAPICard/HomePageAPICard";
import styles from "./DashboardStyles.module.scss";
const Dashboard = () => {
  const [apis, setAPIs] = useState([]);

  const getAllAPIs = async () => {
    try {
      const res = await axios.get("/api/userAPIs/apis");
      console.log(res.data);
      setAPIs(res.data.apis);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getAllAPIs();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["body"]}>
        {/* <div className={styles["banner"]}>
          <img className={styles["img"]} src="/bg.jfif" alt="Preview" />
          <div className={styles["semi-circle"]}></div>
          <div className={styles["text-box"]}>
            <p className={styles["title"]}>Background Image Remover</p>
            <p className={styles["subtitle"]}>100% automatic and free</p>
            <NavLink to="/bg-remover-app" className={styles["btn"]}>
              View app
            </NavLink>
          </div>
        </div> */}
        <h1 className={styles["side-heading"]}>Mini APP APIs</h1>
        <div className={styles["apis"]}>
          <HomePageAPICard
            apiTitle="Background Remover"
            apiDescription="Now remove your background so easily and without any hassles"
            apiImage="/bg.jfif"
          />
          <HomePageAPICard
            apiTitle="What Font?"
            apiDescription="Easily choose whatever font your app needs, that would be so cool"
            apiImage="/font.png"
          />
          <HomePageAPICard
            apiTitle="HTTPS Everywhere"
            apiDescription="Shift to HTTPS and surf securely with that extra s at the end"
            apiImage="/https.png"
          />
          <HomePageAPICard
            apiTitle="Stay Focused"
            apiDescription="Stay focused, by blocking unnecessary websites which disturb you"
            apiImage="/stayfocus.png"
          />
        </div>
        <h1 className={styles["side-heading"]}>All APIs available</h1>
        <div className={styles["apis"]}>
          {
            apis.map((api, index) => (
              <HomePageAPICard key={index} apiTitle={api.name} apiDescription={api.description} apiImage={api.imageUrl || "/api_logo.png"}  />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
