import "./App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import { userContext } from "./userContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import BgRemoverApp from "./components/BgRemoveApp/BgRemoverApp";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewAPI from "./components/Navbar/NewAPI/NewAPI";

function NewApi() {
  return <p>This is new API page</p>;
}
function App() {
  const [user, setUser] = useState({});
  //After logout to be able to get the user again in Login we need to use
  //this variable to hit the backend again
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const res = await axios.get("/api/auth/decodedUser");
      const data = res.data;
      setUser(data.user);
    }
    fetchUser();
  }, [loggedIn]);

  const userDetails = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };

  return (
    <Router>
      <userContext.Provider value={userDetails}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login-signup" element={<LoginSignup />} />
          <Route
            path="/user-dashboard"
            element={<ProtectedRoute component={UserDashboard} />}
          />
          <Route
            path="/new-api"
            element={<ProtectedRoute component={NewAPI} />}
          />

          <Route path="/bg-remover-app" element={<BgRemoverApp />} />
        </Routes>
      </userContext.Provider>
    </Router>
  );
}

export default App;
