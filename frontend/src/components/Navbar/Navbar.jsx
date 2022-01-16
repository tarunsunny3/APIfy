import React from "react";
import { Link } from "react-router-dom/";
import "./NavbarStyles.scss";
const Navbar = () => {
  return (
    <div className="navbar">
      <p className="title">APIfy</p>
      <div className="links">
        <Link to="/" className="navbar-button">
          Login/Signup
        </Link>
        <Link to="/" className="navbar-button">
          +New API
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
