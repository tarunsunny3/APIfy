import React from "react";
import APICard from "../APICard/APICard";
import "./DashboardStyles.scss";
const Dashboard = () => {
  return (
    <div className="container">
      <p style={{ textAlign: "center" }}>All APIs</p>
      <div className="apis">
        <APICard
          apiTitle={"Background Remover"}
          apiDescription={
            "Now remove your background so easily and without any hassles"
          }
          apiImage={"/bg.jfif"}
        />
        <APICard
          apiTitle={"Background Remover"}
          apiDescription={
            "Now remove your background so easily and without any hassles"
          }
          apiImage={"/bg.jfif"}
        />
        <APICard
          apiTitle={"Background Remover"}
          apiDescription={
            "Now remove your background so easily and without any hassles"
          }
          apiImage={"/bg.jfif"}
        />
        <APICard
          apiTitle={"Background Remover"}
          apiDescription={
            "Now remove your background so easily and without any hassles"
          }
          apiImage={"/bg.jfif"}
        />
        <APICard
          apiTitle={"Background Remover"}
          apiDescription={
            "Now remove your background so easily and without any hassles"
          }
          apiImage={"/bg.jfif"}
        />
        <APICard
          apiTitle={"Background Remover"}
          apiDescription={
            "Now remove your background so easily and without any hassles"
          }
          apiImage={"/bg.jfif"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
