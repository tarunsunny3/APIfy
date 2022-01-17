import React from "react";
import { NavLink } from "react-router-dom/";
import "./NavbarStyles.scss";
const Navbar = () => {
  return (
    <div className="navbar">
      <p className="title">APIfy</p>
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
