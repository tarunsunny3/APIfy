import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../../styles/globalStyles.scss";
import APICard from "../../components/APICard/APICard";
const UserDashboard = () => {
  const [apis, setAPIs] = useState([]);
  const getAPIs = async (userId) => {
    let res = await axios.get(`/api/userAPIs/apis/${userId}`);
    setAPIs(res.data.apis);
    console.log(res);
  };
  useEffect(() => {
    let token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = decoded.user.id;
    getAPIs(userId);
  }, []);

  return (
    <div>
      {apis.length == 0 ? (
        <div id ="preloader"></div>
      ) : (
        <>
          {apis.map((api, index) => (
            <APICard apiImage={api.imageUrl || "/api_logo.png"} apiTitle={api.name} apiDescription={"This is a very cool API"} key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default UserDashboard;
