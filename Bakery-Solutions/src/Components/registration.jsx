/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import logo from "../images/Group9.png";
import google from "../images/google_icon.png";
import facebook from "../images/facebook-icon.png";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { HashLink } from "react-router-hash-link";
import "../Style/registration.css";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function Reg() {
  const { auth, setAuth } = useContext(AuthContext, []);
  const navigate = useNavigate();
  const [passwordMode, setPasswordMode] = useState(true);
  const [passwordModeCon, setPasswordModeCon] = useState(true);
  const [ErrorMsg, SetErrorMsg] = useState("");
  const [successMsg, SetSuccessMsg] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [massageWarning, setMassageWarning] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handlePasswordMode() {
    setPasswordMode(!passwordMode);
  }
  function handlePasswordModeCon() {
    setPasswordModeCon(!passwordModeCon);
  }

  const handleUsername = (event) => {
    const name = event.target.value;

    if (name === "") {
      setMassageWarning({ ...massageWarning, username: "Required!" });
    } else {
      setMassageWarning({ ...massageWarning, username: "" });
      setUser({ ...user, name: name.toLowerCase() });
    }
  };

  const handleEmail = (event) => {
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
    const email = event.target.value;

    if (email === "") {
      setMassageWarning({ ...massageWarning, email: "Required!" });
    } else if (!patternEmail.test(email)) {
      setMassageWarning({ ...massageWarning, email: "Invalid email" });
    } else {
      setMassageWarning({ ...massageWarning, email: "" });
      setUser({ ...user, email: email.toLowerCase() });
    }
  };

  const handlePassword = (event) => {
    const patternPassword =
      /^(?=.*[A-Z]?)(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
    const password = event.target.value;

    if (password === "") {
      setMassageWarning({ ...massageWarning, password: "Required!" });
    } else if (!patternPassword.test(password)) {
      setMassageWarning({
        ...massageWarning,
        password:
          "Invalid password, Password must consist of 8 characters, with at least 1 number, uppercase, and special characters",
      });
    } else {
      setMassageWarning({ ...massageWarning, password: "" });
      setUser({ ...user, password: password });
    }
  };

  const handleConfirmPassword = (event) => {
    const password = event.target.value;
    if (password === "") {
      setMassageWarning({ ...massageWarning, confirmPassword: "Required!" });
    } else if (password !== user.password) {
      setMassageWarning({
        ...massageWarning,
        confirmPassword: "Password does not match",
      });
    } else {
      setMassageWarning({ ...massageWarning, confirmPassword: "" });
    }
  };

  const handlePhone = (event) => {
    const patternPhone = /^07\d{8}$/;
    const phone = event.target.value;

    if (phone === "") {
      setMassageWarning({ ...massageWarning, phone: "Required!" });
    } else if (!patternPhone.test(phone)) {
      setMassageWarning({ ...massageWarning, phone: "Invalid number" });
    } else {
      setMassageWarning({ ...massageWarning, phone: "" });
      setUser({ ...user, phone: phone });
    }
  };

  const notifyErr = () => {
    toast.error("This email address is already registered!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/CreateUser",
        user
      );
      localStorage.setItem("token", response.data.token);
      console.log("data Send Successfuly");
      navigate("/");
      SetSuccessMsg(
        `${Swal.fire({
          title: "<strong>Welcome to Bakery Solution</strong>",
          position: "top",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        })}`
      );
      setAuth(true);
    } catch (error) {
      console.log(error);
      SetErrorMsg(notifyErr());
    }

    // norify
    // if (user) {
    //   SetErrorMsg(notifyErr());
    //   return;
    // }
    console.log(user);
  };

  return (
    <>
      <main className="d-flex justify-content-center">
        <div
          className="container login-cont"
          style={{ width: "80%", borderRadius: 20 }}
        >
          <img
            src={logo}
            alt="#"
            style={{ width: "15%", maxWidth: 85, margin: "15px 0" }}
          />
          <div className="d-flex align-items-center justify-content-center">
            <div className="card border-0">
              <div
                id="regForm"
                className="card-body px-5 "
                style={{ width: "70vw", maxWidth: 800 }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="form-floating my-4">
                    <input
                      type="text"
                      className="form-control FM"
                      id="userName"
                      placeholder="Enter userName Address"
                      required
                      onBlur={handleUsername}
                    />
                    <label htmlFor="userName">Full Name</label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.username}
                      </span>
                    </p>
                  </div>
                  <div className="form-floating my-4">
                    <input
                      type="text"
                      className="form-control FM"
                      id="email"
                      placeholder="Enter Email Address"
                      required
                      onBlur={handleEmail}
                    />
                    <label htmlFor="email">Email address</label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.email}
                      </span>
                    </p>
                  </div>
                  <div className="form-floating my-4">
                    <input
                      type="text"
                      className="form-control FM"
                      id="password"
                      placeholder="Enter password"
                      required
                      onBlur={handlePhone}
                    />
                    <label htmlFor="password">Mobile Number</label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.phone}
                      </span>
                    </p>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type={passwordMode ? "password" : "text"}
                      className="form-control FM"
                      id="password"
                      placeholder="Enter Password"
                      required
                      onBlur={handlePassword}
                    />
                    <div className="position-relative">
                      <span
                        id="eyeSpan"
                        className="eye position-absolute"
                        onClick={handlePasswordMode}
                        style={{ top: "-35px", left: "95%" }}
                      >
                        <i
                          className={`fas fa-eye ${
                            passwordMode ? "d-inline" : "d-none"
                          }`}
                          id="showEye"
                          style={{ color: "#8b4403ab" }}
                        />
                        <i
                          className={`fas fa-eye-slash ${
                            passwordMode ? "d-none" : "d-inline"
                          }`}
                          id="hideEye"
                          style={{ color: "#8b4403" }}
                        />
                      </span>
                    </div>
                    <label htmlFor="password">Password </label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.password}
                      </span>
                    </p>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type={passwordModeCon ? "password" : "text"}
                      className="form-control FM"
                      id="CPassword"
                      placeholder="Enter CPassword"
                      required
                      onBlur={handleConfirmPassword}
                    />
                    <div className="position-relative">
                      <span
                        id="eyeSpan"
                        className="eye  position-absolute"
                        onClick={handlePasswordModeCon}
                        style={{ top: "-35px", left: "95%" }}
                      >
                        <i
                          className={`fas fa-eye ${
                            passwordModeCon ? "d-inline" : "d-none"
                          }`}
                          id="showEye"
                          style={{ color: "#8b4403ab" }}
                        />
                        <i
                          className={`fas fa-eye-slash ${
                            passwordModeCon ? "d-none" : "d-inline"
                          }`}
                          id="hideEye"
                          style={{ color: "#8b4403" }}
                        />
                      </span>
                    </div>
                    <label htmlFor="CPassword">Confirm Password </label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.confirmPassword}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex flex-row flex-wrap justify-content-between mt-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="defaultCheck1"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        Accept 'Terms &amp; Conditions, Privacy Policy for using
                        this application
                      </label>
                    </div>
                  </div>
                  <div className="d-grid gap-2 my-4">
                    <button className="login-btn" type="submit">
                      Sign Up
                    </button>
                  </div>
                  <div className="text-center mb-5">
                    <p>
                      Do you have an account?
                      <HashLink
                        smooth
                        to="/login/#"
                        style={{ textDecoration: "none", color: "#8b4403ed" }}
                      >
                        SignIn
                      </HashLink>
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-center text-center">
                    {ErrorMsg && <p style={{ color: "red" }}>{ErrorMsg}</p>}
                    {successMsg && <p style={{ color: "red" }}>{successMsg}</p>}
                  </div>
                  <div className="sda text-center">
                    <p>Or Sign Up with</p>
                  </div>
                  <div className="d-flex justify-content-center mb-5">
                    <a href="#">
                      <img style={{ width: 30 }} src={google} alt="" />
                    </a>
                    <a href="#">
                      <img
                        style={{ margin: "0 10px", width: 30 }}
                        src={facebook}
                        alt=""
                      />
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2000} limit={1} hideProgressBar={true} />
      </main>
    </>
  );
}

export default Reg;
