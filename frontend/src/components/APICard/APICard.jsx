import React from "react";
import "./APICardStyles.scss";

const APICard = ({ apiImage, apiTitle, apiDescription }) => {
  return (
    <div className="api-card">
      <img src={apiImage} alt="API picture" />
      <p className="api-title">{apiTitle}</p>
      <p className="api-desc">{apiDescription}</p>
    </div>
  );
};

export default APICard;
