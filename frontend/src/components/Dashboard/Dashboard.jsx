import React from "react";
import {NavLink} from 'react-router-dom';
import APICard from "../APICard/APICard";
import styles from "./DashboardStyles.module.scss";
const Dashboard = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["body"]}>
        <div className={styles["banner"]}>
          <img className={styles["img"]} src="/bg.jfif" alt="Preview" />
          <div className={styles["semi-circle"]}></div>
          <div className={styles["text-box"]}>
            <p className={styles["title"]}>Background Image Remover</p>
            <p className={styles["subtitle"]}>100% automatic and free</p>
            <NavLink to="/bg-remover-app" className={styles["btn"]}>View app</NavLink>
          </div>
        </div>
        <h1 className={styles["side-heading"]}>All APIs available</h1>
        <div className={styles["apis"]}>
          <APICard
            apiTitle="Background Remover"
            apiDescription="Now remove your background so easily and without any hassles"
            apiImage="/bg.jfif"
          />
          <APICard
            apiTitle="What Font?"
            apiDescription="Easily choose whatever font your app needs, that would be so cool"
            apiImage="/font.png"
          />
          <APICard
            apiTitle="HTTPS Everywhere"
            apiDescription="Shift to HTTPS and surf securely with that extra s at the end"
            apiImage="/https.png"
          />
          <APICard
            apiTitle="Stay Focused"
            apiDescription="Stay focused, by blocking unnecessary websites which disturb you"
            apiImage="/stayfocus.png"
          />
          <APICard
            apiTitle="Background Remover"
            apiDescription="Now remove your background so easily and without any hassles"
            apiImage="/bg.jfif"
          />
          <APICard
            apiTitle="What Font?"
            apiDescription="Easily choose whatever font your app needs, that would be so cool"
            apiImage="/font.png"
          />
          <APICard
            apiTitle="HTTPS Everywhere"
            apiDescription="Shift to HTTPS and surf securely with that extra s at the end"
            apiImage="/https.png"
          />
          <APICard
            apiTitle="Stay Focused"
            apiDescription="Stay focused, by blocking unnecessary websites which disturb you"
            apiImage="/stayfocus.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
