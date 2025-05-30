import React, { useState } from "react";
import * as logFunc from "./loginFunctions.js";
import "./logOrsign.css";
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LogOrsign() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getToSignUp = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await logFunc.logUserIn(userData);
      const { token } = response.data;
      sessionStorage.setItem("authToken", token);
      navigate("/routes");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <section className="myform-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="form-area login-form">
                <div className="form-content">
                  <h2>Login</h2>
                  <p>You chose the right option</p>
                  <ul>
                    <li>
                      <a
                        href="/#"
                        className="facebook"
                        onClick={(e) => e.preventDefault()}
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="google"
                        onClick={(e) => e.preventDefault()}
                      >
                        <FaTwitterSquare />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="form-input">
                  <h2>Enter Credentials</h2>
                  <form onSubmit={submitData}>
                    <div className="form-group">
                      <input
                        id="email"
                        className="loginInfo"
                        type="email"
                        name="email"
                        value={userData.email}
                        required
                        onChange={handleChangeEvent}
                      />
                      <label htmlFor="email">Email-Id</label>
                    </div>
                    <div className="form-group">
                      <input
                        id="password"
                        className="loginInfo"
                        type="password"
                        name="password"
                        value={userData.password}
                        required
                        onChange={handleChangeEvent}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="myform-button">
                      <button
                        type="submit"
                        className="myform-btn"
                        disabled={loading}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div>
                      <small className="form-text text-muted signup-text">
                        Not a user yet?
                      </small>
                      <span className="signUPtext">
                        <a href="/#" onClick={getToSignUp}>
                          Sign-Up
                        </a>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
