import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom/";
import { userContext } from "../../userContext";
import "./NavbarStyles.scss";
const Navbar = () => {
  const { user, setUser, setLoggedIn } = React.useContext(userContext);
  const navigate = useNavigate();
  const Logout = async () => {
    const d = await axios.get("/api/auth/logout");
    setUser({ id: null, username: null });
    console.log(d);
    setLoggedIn(false);
    navigate("/login-signup");
  };

  return (
    <div className="navbar">
      <p onClick={() => navigate("/")} className="title">
        APIfy
      </p>
      <div className="links">
        {(user === null || user == undefined || user.id == null) && (
          <>
            <button
              className="navbar-button"
              onClick={() => navigate("/login-signup")}
            >
              Login/Signup
            </button>
          </>
        )}
        {user != null && user.id != null && (
          <>
            <button
              className="navbar-button"
              onClick={() => navigate("/new-api")}
            >
              +New API
            </button>
            <button className="navbar-button" onClick={() => Logout()}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
