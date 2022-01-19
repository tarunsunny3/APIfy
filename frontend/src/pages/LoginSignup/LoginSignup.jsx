import React, { useState } from "react";
import {useFormik} from 'formik';
import "./LoginSignupStyles.scss";

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }else if(values.password.length < 6){
    errors.password = 'Password length must be atleast 6 chars'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Both password and confirm passwords must be same';
  }else if(values.confirmPassword.length < 6){
    errors.confirmPassword = 'Password length must be atleast 6 chars'
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};
const LoginSignup = () => {
  //Initially isLogin will be true
  //when the user clicks on register, then isLogin will be ste to false
  //false means it is a register page
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (values)=>{
    alert(JSON.stringify(values, null, 2));
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: values => handleSubmit(values),
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
          {isLogin ? (
            <h3 style={{ marginBottom: "2%" }}>Login to your account</h3>
          ) : (
            <h3 style={{ marginBottom: "2%" }}>Sign up</h3>
          )}
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <br />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.values.password}
            />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
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
              {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
              </>
            )}
            <input type="submit"  value={isLogin ? "Login" : "Signup"} />
          </form>
          <a
            style={{ display: "block", marginTop: "2%" }}
            href="javascript:void(0)"
            onClick={() => setIsLogin(!isLogin)}
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
