import React from "react";
import "./LoginStyles.scss";
const Login = () => {
  return (
    <div className="container">
      <div className="column1">
        <div className="text-box">
          <p>
            <span>
              <i
                style={{ color: "#142683" }}
                className="fas fa-2x fa-user-plus"
              ></i>
            </span>
          </p>
          <br />
          <p className="content-title">Welcome to your dashboard</p>
          <p className="content-subtitle">
            Your uploaded APIs will be displayed here once you login to your
            account
          </p>
        </div>
      </div>
      <div className="column2">
        <div className="form-box">
          <h3 style={{ marginBottom: "2%" }}>Login to your account</h3>
          <form action="">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
            />
            <br />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <br />
            <br />
            <input type="submit" value="Login/Signup" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
