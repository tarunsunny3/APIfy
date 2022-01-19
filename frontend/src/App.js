import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import LoginSignup from "./pages/LoginSignup/LoginSignup";

function NewApi() {
  return <p>New API page</p>;
}
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/new-api" element={<NewApi />} />
      </Routes>
    </Router>
  );
}

export default App;
