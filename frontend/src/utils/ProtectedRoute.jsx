import React from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../userContext";
import "../styles/globalStyles.scss";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = React.useContext(userContext);
  //This means the App.js is still setting the cookie value into the user
  if (user.id === "1" || user.id === undefined) {
    return <div className="page-loader"></div>;
  }
  if (user.id !== null) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login-signup" />;
  }
};

export default ProtectedRoute;
