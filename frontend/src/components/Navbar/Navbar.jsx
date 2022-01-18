import React from "react";
import { NavLink, useNavigate } from "react-router-dom/";
import "./NavbarStyles.scss";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <p onClick={() => navigate("/")} className="title">
        APIfy
      </p>
      <div className="links">
        <NavLink
          className={(isActive) =>
            "navbar-button " + (isActive ? "unselected" : "")
          }
          to="/login"
        >
          Login/Signup
        </NavLink>
        <NavLink
          className={(isActive) =>
            "navbar-button" + (!isActive ? " unselected" : "")
          }
          to="/newAPI"
        >
          +New API
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
