import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom/";
import { userContext } from "../../userContext";
import styles from "./NavbarStyles.module.scss";
import NewAPI from "./NewAPI/NewAPI";
const Navbar = () => {
  const { user, setUser, setLoggedIn } = useContext(userContext);
  const [showAPIModal, setShowAPIModal] = useState(false);
  const navigate = useNavigate();
  const Logout = async () => {
    const d = await axios.get("/api/auth/logout");
    setUser({ id: null, username: null });
    console.log(d);
    setLoggedIn(false);
    navigate("/login-signup");
  };
  const clickOutside = (e) =>{
    const modal = document.getElementById('new-api-modal');
    if(e.target == modal){
      setShowAPIModal(false);
    }
  }
  useEffect(() => {
   window.addEventListener('click', clickOutside);
  }, []);
  
  return (
    <div className={styles.navbar}>
      {
        showAPIModal && 
        <NewAPI showAPIModal={showAPIModal} setShowAPIModal={setShowAPIModal} />
      }
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
              onClick={() => setShowAPIModal(true)}
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

