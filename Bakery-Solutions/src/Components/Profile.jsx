/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import pageLogo from "../images/Group9.png";
import { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardsUserProfile from "./SubComponents/cardsUserProfile";

const notifySucess = () => {
  Swal.fire({
    title: "<strong>Thank You, Your Date Was Updated Successfully</strong>",
    position: "top",
    icon: "success",
    iconColor: "#FFD966",
    background: "#FFF2CC",
    color: "#8B4403",
    showConfirmButton: false,
    timer: 2000,
  });
};

function Profile() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("view");
  const [newpasswordMode, setnewpasswordMode] = useState(true);
  const [passwordModeCon, setPasswordModeCon] = useState(true);
  const [requiredName, setrequiredName] = useState(false);
  const [requiredemail, setrequiredemail] = useState(false);
  const [requiredPhone, setrequiredPhone] = useState(false);
  const [requiredNewPass, setRequiredNewPass] = useState(false);
  const [requiredCoPass, setRequiredCoPass] = useState(false);
  ///////////////////////////////////////////////////
  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to Update your Info?",
        color: "#8B4403",
        icon: "warning",
        iconColor: "#FFD966",
        showCancelButton: true,
        confirmButtonColor: "#8B4403",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",
        background: "#FFF2CC",
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
          notifySucess();
        } else {
          resolve(false);
        }
      });
    });
  };
  ///////////////////////////////////////////////////
  const [OldData, setOldData] = useState({
    email: "",
    full_name: "",
    phone: "",
  });
  const [newData, setNewData] = useState({
    email: "",
    full_name: "",
    phone: "",
    new_password: "",
    confirm_password: "",
  });
  const [massageWarning, setMassageWarning] = useState({
    email: "",
    full_name: "",
    phone: "",
    new_password: "",
    confirm_password: "",
  });
  const [dataToServer, setDataToServer] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  ///////////////////////////////////////////////////
  const [userid, setuserId] = useState();
  // console.log("iddddddddddd", userid);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage?.getItem("token");
      let id;
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          id = decodedToken.user_id;
          setuserId(id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const result = response.data;
        setOldData((prevData) => ({
          ...prevData,
          email: result[0]?.email,
          full_name: result[0]?.full_name,
          phone: result[0]?.phone,
        }));
        setNewData((prevData) => ({
          ...prevData,
          email: result[0]?.email,
          full_name: result[0]?.full_name,
          phone: result[0]?.phone,
        }));
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(newData);

  ///////////////////////////////////////////////////

  function handleTabChange(newTab) {
    setTab(newTab);
  }
  // console.log(tab);

  ///////////////////////////////////////////////////

  useEffect(() => {
    if (newData?.email !== OldData?.email) {
      setrequiredemail(true);
    }
  }, [newData, OldData]);

  const handleEmail = (event) => {
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
    const email = event.target.value;
    if (email === "") {
      setMassageWarning({
        ...massageWarning,
        email: "It can't be empty update or keep it",
      });
    } else if (!patternEmail.test(email)) {
      setMassageWarning({ ...massageWarning, email: "Invalid email" });
    } else {
      setMassageWarning({ ...massageWarning, email: "" });
      setNewData((prevFormData) => ({
        ...prevFormData,
        email: email,
      }));
    }
  };

  useEffect(() => {
    setDataToServer((prevData) => ({
      ...prevData,
      full_name: newData?.full_name,
      email: newData?.email,
      phone: newData?.phone,
    }));
    if (newData?.new_password !== "") {
      setDataToServer((prevData) => ({
        ...prevData,
        password: newData?.new_password,
      }));
    }
  }, [newData]);
  // console.log("passssss ", newData?.new_password);
  ////////////////////////////////////////////////
  useEffect(() => {
    if (newData?.full_name !== OldData?.full_name) {
      setrequiredName(true);
    }
  }, [newData, OldData]);

  const handleName = (event) => {
    const pattern = /^[a-zA-Z]+$/;
    const name = event.target.value;
    if (name === "") {
      setMassageWarning({
        ...massageWarning,
        full_name: "It can't be empty update or keep it",
      });
    } else if (!pattern.test(name)) {
      setMassageWarning({ ...massageWarning, full_name: "Invalid Name" });
    } else {
      setMassageWarning({ ...massageWarning, full_name: "" });
      setNewData((prevFormData) => ({
        ...prevFormData,
        full_name: name,
      }));
    }
  };
  ////////////////////////////////////////////////

  useEffect(() => {
    if (newData?.phone !== OldData?.phone) {
      setrequiredPhone(true);
    }
  }, [newData, OldData]);

  const handleNumber = (event) => {
    const pattern = /^07\d{8}$/;
    const number = event.target.value;
    if (number === "") {
      setMassageWarning({
        ...massageWarning,
        phone: "It can't be empty update or keep it",
      });
    } else if (!pattern.test(number)) {
      setMassageWarning({ ...massageWarning, phone: "Invalid number" });
    } else {
      setMassageWarning({ ...massageWarning, phone: "" });
      setNewData((prevFormData) => ({
        ...prevFormData,
        phone: number,
      }));
    }
  };

  // console.log("name", requiredName);
  // console.log("email", requiredemail);
  // console.log("phone", requiredPhone);
  // console.log("newpass", requiredNewPass);
  // console.log("conf", requiredCoPass);
  // console.log("toServer", dataToServer);

  ////////////////////////////////////////////////

  const handleNewPassword = (event) => {
    const patternPassword =
      /^(?=.*[A-Z]?)(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
    const password = event.target.value;
    if (password === "") {
      setMassageWarning({ ...massageWarning, new_password: "" });
    } else if (!patternPassword.test(password)) {
      setMassageWarning({
        ...massageWarning,
        new_password:
          "Invalid password, Password must consist of 8 characters,at least 1 number,1 uppercase,1 special characters",
      });
    } else {
      setMassageWarning({ ...massageWarning, new_password: "" });
      setNewData((prevFormData) => ({
        ...prevFormData,
        new_password: password,
      }));
    }
  };

  ////////////////////////////////////////////////

  useEffect(() => {
    if (newData?.new_password !== "") {
      setRequiredCoPass(true);
    }
  }, [newData, OldData]);

  const handleConfirmNewPassword = (event) => {
    const password = event.target.value;
    if (requiredCoPass === true) {
      if (password === "") {
        setMassageWarning({
          ...massageWarning,
          confirm_password: "Can not be empty",
        });
      } else if (password !== newData?.new_password) {
        setMassageWarning({
          ...massageWarning,
          confirm_password: "Password does not match",
        });
      } else {
        setMassageWarning({
          ...massageWarning,
          confirm_password: "",
        });
        setNewData((prevFormData) => ({
          ...prevFormData,
          confirm_password: password,
        }));
      }
    }
  };

  useEffect(() => {
    if (newData?.new_password === newData?.confirm_password) {
      setRequiredCoPass(false);
    }
  }, [newData]);
  ///////////////////////////////////////////////////
  // console.log(massageWarning);

  function handleNewPasswordMode() {
    setnewpasswordMode(!newpasswordMode);
  }
  function handleNewPasswordModeCo() {
    setPasswordModeCon(!passwordModeCon);
  }

  const [changedData, setChangedData] = useState();

  useEffect(() => {
    if (
      newData?.full_name !== OldData?.full_name ||
      newData?.email !== OldData?.email ||
      newData?.phone !== OldData?.phone
    ) {
      setChangedData(true);
    }
    if (newData?.confirm_password !== newData?.new_password) {
      setChangedData(true);
    }
  }, [newData, OldData]);
  // console.log("chasdasdasd", changedData);
  ///////////////////////////////////////////////////
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (changedData === true) {
      const confirmed = await showConfirmationPrompt();

      if (confirmed) {
        try {
          const response = await axios.put(
            `http://localhost:5000/updateuserProfile/${userid}`,
            dataToServer
          );
          console.log(response);
          console.log(`user with ${userid} update info succesfully`);
        } catch (error) {
          console.log(error);
        }
        try {
          setOldData((prevFormData) => ({
            ...prevFormData,
            full_name: dataToServer.full_name,
            email: dataToServer.email,
            phone: dataToServer.phone,
          }));
          setChangedData(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  ///////////////////////////////////////////////////
  // console.log("Old", OldData);
  // console.log("New", newData);
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  return (
    <>
      <main className="container-fluid d-flex justify-content-center">
        <div
          className="container login-cont"
          style={{ width: "80%", borderRadius: 20 }}
        >
          <img
            src={pageLogo}
            alt="#"
            style={{ width: "15%", maxWidth: 85, margin: "15px 0" }}
          />
          <div className="d-flex flex-column align-items-center justify-content-center mb-5">
            <div className="btn-group d-flex justify-content-center">
              <button
                className="btn login-btn"
                onClick={() => handleTabChange("veiw")}
              >
                veiw your orders
              </button>
              <button
                className="btn login-btn"
                onClick={() => handleTabChange("Update")}
              >
                your information
              </button>
            </div>
            <div>
              <div className="card border-0">
                <div
                  className="card-body"
                  style={{ width: "70vw", maxWidth: 800 }}
                >
                  {tab === "veiw" ? (
                    <>
                      <div>
                        <CardsUserProfile />
                      </div>
                    </>
                  ) : (
                    <>
                      <form onSubmit={handleFormSubmit} className="mt-5">
                        <div className="form-floating my-4">
                          {requiredName === true ? (
                            <>
                              <input
                                type="text"
                                className="form-control FM"
                                id="userName"
                                placeholder="Enter FullName"
                                required
                                defaultValue={OldData?.full_name}
                                onBlur={handleName}
                              />
                            </>
                          ) : (
                            <>
                              <input
                                type="text"
                                className="form-control FM"
                                id="userName"
                                placeholder="Enter FullName"
                                defaultValue={OldData?.full_name}
                                onBlur={handleName}
                              />
                            </>
                          )}
                          <label htmlFor="userName">Full Name</label>
                          <p className="mt-2 text-sm text-danger">
                            <span className="font-weight-medium">
                              {massageWarning.full_name}
                            </span>
                          </p>
                        </div>
                        <div className="form-floating my-4">
                          {requiredemail === true ? (
                            <>
                              {" "}
                              <input
                                type="text"
                                className="form-control FM"
                                id="email"
                                placeholder="Enter Email Address"
                                required
                                defaultValue={OldData?.email}
                                onBlur={handleEmail}
                              />
                            </>
                          ) : (
                            <>
                              <input
                                type="text"
                                className="form-control FM"
                                id="email"
                                placeholder="Enter Email Address"
                                defaultValue={OldData?.email}
                                onBlur={handleEmail}
                              />
                            </>
                          )}
                          <label htmlFor="email">Email Address</label>
                          <p className="mt-2 text-sm text-danger">
                            <span className="font-weight-medium">
                              {massageWarning.email}
                            </span>
                          </p>
                        </div>
                        <div className="form-floating mb-4">
                          {requiredPhone === true ? (
                            <>
                              {" "}
                              <input
                                type="text"
                                className="form-control FM"
                                id="phone"
                                placeholder="Enter phone"
                                maxLength={10}
                                required
                                defaultValue={OldData?.phone}
                                onBlur={handleNumber}
                              />
                            </>
                          ) : (
                            <>
                              <input
                                type="text"
                                className="form-control FM"
                                id="phone"
                                maxLength={10}
                                placeholder="Enter phone"
                                defaultValue={OldData?.phone}
                                onBlur={handleNumber}
                              />
                            </>
                          )}
                          <label htmlFor="phone">Mobile Number</label>
                          <p className="mt-2 text-sm text-danger">
                            <span className="font-weight-medium">
                              {massageWarning.phone}
                            </span>
                          </p>
                        </div>
                        <div className="form-floating mb-4">
                          <input
                            type={newpasswordMode ? "password" : "text"}
                            className="form-control FM"
                            id="new_password"
                            placeholder="Enter Password"
                            onBlur={handleNewPassword}
                          />
                          <div className="position-relative">
                            <span
                              id="eyeSpan"
                              className="eye position-absolute"
                              onClick={handleNewPasswordMode}
                              style={{ top: "-35px", left: "95%" }}
                            >
                              <i
                                className={`fas fa-eye ${
                                  newpasswordMode ? "d-inline" : "d-none"
                                }`}
                                id="showEye"
                                style={{ color: "#8b4403ab" }}
                              />
                              <i
                                className={`fas fa-eye-slash ${
                                  newpasswordMode ? "d-none" : "d-inline"
                                }`}
                                id="hideEye"
                                style={{ color: "#8b4403" }}
                              />
                            </span>
                          </div>
                          <label htmlFor="new_password">New password</label>
                          <p className="mt-2 text-sm text-danger">
                            <span className="font-weight-medium">
                              {massageWarning.new_password}
                            </span>
                          </p>
                        </div>
                        <div className="form-floating mb-4">
                          {requiredCoPass === true ? (
                            <>
                              <input
                                type={passwordModeCon ? "password" : "text"}
                                className="form-control FM"
                                id="confirm_password"
                                placeholder="Enter confirm_password"
                                required
                                onBlur={handleConfirmNewPassword}
                              />
                            </>
                          ) : (
                            <>
                              <input
                                type={passwordModeCon ? "password" : "text"}
                                className="form-control FM"
                                id="confirm_password"
                                placeholder="Enter confirm_password"
                                onBlur={handleConfirmNewPassword}
                              />
                            </>
                          )}
                          <div className="position-relative">
                            <span
                              id="eyeSpan"
                              className="eye position-absolute"
                              onClick={handleNewPasswordModeCo}
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
                          <label htmlFor="confirm_password">
                            Confirem new password
                          </label>
                          <p className="mt-2 text-sm text-danger">
                            <span className="font-weight-medium">
                              {massageWarning.confirm_password}
                            </span>
                          </p>
                        </div>
                        <div className="d-flex flex-row mb-4 justify-content-center mt-lg-5">
                          <button className="login-btn" type="submit">
                            Update
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Profile;
