import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom/";
import { userContext } from "../../userContext";
import styles from "./NavbarStyles.module.scss";
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
    <div className={styles.navbar}>
      <p onClick={() => navigate("/")} className={styles.title}>
        APIfy
      </p>
      <div className={styles.links}>
        {(user === null || user == undefined || user.id == null) && (
          <>
            <button
              className={styles["navbar-button"]}
              onClick={() => navigate("/login-signup")}
            >
              Login/Signup
            </button>
          </>
        )}
        {user != null && user.id != null && (
          <>
            <button
              className={styles["navbar-button"]}
              onClick={() => navigate("/new-api")}
            >
              +New API
            </button>
            <button className={styles["navbar-button"]} onClick={() => Logout()}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
