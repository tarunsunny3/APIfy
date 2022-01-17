import React from "react";
import APICard from "../APICard/APICard";
import "./DashboardStyles.scss";
const Dashboard = () => {
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: "blueviolet" }}>
        All APIs available
      </h1>
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
      <h1 style={{ textAlign: "center", color: "blueviolet" }}>My APIs</h1>
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
      </div>
    </div>
  );
};

export default Dashboard;
