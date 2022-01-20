import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import {useNavigate} from 'react-router-dom';
import "./LoginSignupStyles.scss";
import '../../styles/globalStyles.scss';

const validate = (values, isLogin) => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password length must be atleast 6 chars";
  }

  if (!isLogin) {
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword =
        "Both password and confirm passwords must be same";
     } else if (values.confirmPassword.length < 6) {
      errors.confirmPassword = "Password length must be atleast 6 chars";
    }
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};
const LoginSignup = () => {
  //Initially isLogin will be true
  //when the user clicks on register, then isLogin will be ste to false
  //false means it is a register page
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState({msgType: "error", msg: ""});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (values, isLogin) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `/api/auth/${isLogin ? "login" : "signup"}`,
        values,
      );
      console.log(res.data);
      if (res.data.success === false) {
        setMessage({msgType: "error", msg:  res.data.message});
      } else if (res.data.error) {
        setErrors(res.data.errors);
      }

      if(res.data.success){
        if(isLogin){
          navigate('/new-api');
        }else{
          setErrors([]);
          setIsLogin(!isLogin);
          setMessage({msgType: "success", msg: "Thank you for signing up, please login"});
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => validate(values, isLogin),
    onSubmit: (values) => {
      handleSubmit(values, isLogin);
    },
  });
  return (
    <div className="container">
      <div className="column1">
        <div className="text-box">
          <p>
            <span>
              {isLogin ? (
                <i className="fas fa-2x fa-sign-in-alt icon"></i>
              ) : (
                // <i className="fa-duotone fa-arrow-right-to-bracket"></i>
                // <i className="fa fa-2x fa-sign-in icon" aria-hidden="true"></i>
                <i className="fas fa-2x fa-user-plus icon"></i>
              )}
            </span>
          </p>
          <br />
          {isLogin ? (
            <p className="content-title">Welcome to your dashboard</p>
          ) : (
            <p className="content-title">Welcome to our APIfy market place</p>
          )}

          {isLogin ? (
            <p className="content-subtitle">
              Your uploaded APIs will be displayed here once you login to your
              account
            </p>
          ) : (
            <p className="content-subtitle">
              Find many APIs, test them and view and upload your own APIs as
              well...
            </p>
          )}
        </div>
      </div>
      <div className="column2">
        <div className="form-box">
          {errors.length !== 0 &&
            errors.map((error, index) => {
              return (
                <p key={index} className="error">
                  {error.msg}
                </p>
              );
            })}
          {message.msg.length !== 0 && <p className={message.msgType=="error" ? "error": "success"}>{message.msg}</p>}
          {isLogin ? (
            <h3 style={{ marginTop: "2%", marginBottom: "2%" }}>Login to your account</h3>
          ) : (
            <h3 style={{ marginTop: "2%", marginBottom: "2%" }}>Sign up</h3>
          )}
          <form onSubmit={formik.handleSubmit} method="POST">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <br />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
            <br />
            <br />
            {!isLogin && (
              <>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirmPassword ? (
                  <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}
              </>
            )}
            {loading && (
              <div className="loader-container">
                <p className="loader"></p>
              </div>
            )}

            <input type="submit" value={isLogin ? "Login" : "Signup"} />
          </form>
          <a
            href=""
            style={{ display: "block", marginTop: "2%" }}
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
              setMessage({msgType: "error", msg: ""});
            }}
          >
            {isLogin
              ? "Don't have account? Sign up here"
              : "Please login here..."}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
