/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import { HashLink } from "react-router-hash-link";
import "../Style/login.css";
import logo from "../images/Group9.png";
import google from "../images/google_icon.png";
import facebook from "../images/facebook-icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function Login() {
  const { auth, setAuth } = useContext(AuthContext, []);
  const navigate = useNavigate();
  const [passwordMode, setPasswordMode] = useState(true);
  const [ErrorMsg, SetErrorMsg] = useState("");
  const [successMsg, SetSuccessMsg] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [massageWarning, setMassageWarning] = useState({
    email: "",
    password: "",
  });
  function handlePasswordMode() {
    setPasswordMode(!passwordMode);
  }

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

  const notifyErr = () => {
    toast.error(
      `This email address Doesn't register!
    please Sign-Up`,
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };

  const HandleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/loginUser",
        user
      );
      localStorage.setItem("token", response.data.token);
      console.log("data Send Successfuly");
      localStorage.getItem("cart") ? navigate("/cart") : navigate("/");
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

      event.target.reset();
    } catch (error) {
      console.log(error);
      SetErrorMsg(notifyErr());
    }

    console.log(user);
  };

  return (
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
              className="card-body cardBody px-5"
              style={{ width: "70vw", maxWidth: 800 }}
            >
              <form onSubmit={HandleSignIn}>
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
                </div>
                <div className="d-flex flex-row flex-wrap justify-content-between mt-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="defaultCheck1"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck1">
                      Remember me
                    </label>
                  </div>
                  <div className="forgotPass">
                    <a
                      href=""
                      style={{ textDecoration: "none", color: "#8b4403ed" }}
                    >
                      <p>Forgot Password ?</p>
                    </a>
                  </div>
                </div>
                <div className="d-grid gap-2 my-4">
                  <button className="login-btn" type="submit">
                    Sign In
                  </button>
                </div>
                <div className="d-flex flex-row justify-content-center text-center">
                  {ErrorMsg && <p style={{ color: "red" }}>{ErrorMsg}</p>}
                  {successMsg && <p style={{ color: "red" }}>{successMsg}</p>}
                </div>
                <div className="text-center mb-5">
                  <p>
                    Don’t have an account?
                    <HashLink
                      smooth
                      to="/Reg/#"
                      style={{ textDecoration: "none", color: "#8b4403ed" }}
                    >
                      Signup
                    </HashLink>
                  </p>
                </div>
                <div className="sda text-center ">
                  <p>Or sign in with</p>
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
  );
}

export default Login;
