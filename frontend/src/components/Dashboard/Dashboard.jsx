import React from "react";
import APICard from "../APICard/APICard";
import "./DashboardStyles.scss";
const Dashboard = () => {
  return (
    <div className="container">
      <div className="body">
        <div className="banner">
          <img className="img" src="/bg.jfif" alt="Preview" />
          <div className="semi-circle"></div>
          <div className="text-box">
            <p className="title">Background Image Remover</p>
            <p className="subtitle">100% automatic and free</p>
            <button className="btn">View app</button>
          </div>
        </div>
        <h1 className="side-heading">All APIs available</h1>
        <div className="apis">
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
