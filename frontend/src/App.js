import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

function Login() {
  return <p>Login Page</p>;
}
function NewApi() {
  return <p>New API page</p>;
}
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newAPI" element={<NewApi />} />
      </Routes>
    </Router>
  );
}

export default App;
