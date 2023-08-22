/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import pageLogo from "../images/Group9.png";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const [userTokenInfo, setUserTokenInfo] = useState(null);
  const navigate = useNavigate();
  const [massageWarning, setMassageWarning] = useState({
    email: "",
    name: "",
    city: "",
    street_name: "",
    phone: "",
    postal_code: "",
  });
  ////////////////////////////////////////////////
  const notifySucess = () => {
    Swal.fire({
      title: "<strong>Your Information is Saved Successfully</strong>",
      position: "top",
      icon: "success",
      iconColor: "#FFD966",
      background: "#FFF2CC",
      color: "#8B4403",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to Save your Information?",
        color: "#8B4403",
        icon: "warning",
        iconColor: "#FFD966",
        showCancelButton: true,
        confirmButtonColor: "#8B4403",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!",
        background: "#FFF2CC",
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
          notifySucess();
          navigate("/pay");
        } else {
          resolve(false);
        }
      });
    });
  };
  ////////////////////////////////////////////////

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserTokenInfo(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  ////////////////////////////////////////////////

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    city: "",
    street_name: "",
    phone: "",
    postal_code: "",
  });

  ///////////////////////////////////////////////////////////////////////

  const handleUsername = (event) => {
    const name = event.target.value;
    if (name === "") {
      setMassageWarning({ ...massageWarning, name: "Required!" });
    } else {
      setMassageWarning({ ...massageWarning, name: "" });
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: name,
      }));
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
      setFormData({ ...formData, email: email.toLowerCase() });
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
      setFormData({ ...formData, phone: phone });
    }
  };

  const handlecity = (event) => {
    const patternCity = /^[a-zA-Z\s_-]+$/;
    const city = event.target.value;
    if (city === "") {
      setMassageWarning({ ...massageWarning, city: "Required!" });
    } else if (!patternCity.test(city)) {
      setMassageWarning({ ...massageWarning, city: "Invalid City Name" });
    } else {
      setMassageWarning({ ...massageWarning, city: "" });
      setFormData({ ...formData, city: city });
    }
  };

  const handleStName = (event) => {
    const pattern = /^[a-zA-Z\s_-]+$/;
    const stName = event.target.value;
    if (stName === "") {
      setMassageWarning({ ...massageWarning, street_name: "Required!" });
    } else if (!pattern.test(stName)) {
      setMassageWarning({
        ...massageWarning,
        street_name: "Invalid Street Name",
      });
    } else {
      setMassageWarning({ ...massageWarning, street_name: "" });
      setFormData({ ...formData, street_name: stName });
    }
  };

  const handlePostal = (event) => {
    const postalpattern = /^\d{5}$/;
    const postal = event.target.value;
    if (postal === "") {
      setMassageWarning({ ...massageWarning, postal_code: "Required!" });
    } else if (!postalpattern.test(postal)) {
      setMassageWarning({
        ...massageWarning,
        postal_code: "Invalid Postal Code",
      });
    } else {
      setMassageWarning({ ...massageWarning, postal_code: "" });
      setFormData({ ...formData, postal_code: postal });
    }
  };

  ///////////////////////////////////////////////////////////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmed = await showConfirmationPrompt();
    const isExist = localStorage.getItem("Contact&Shipping") ? true : false;

    if (isExist) {
      try {
        localStorage.removeItem("Contact&Shipping");
      } catch (error) {
        console.log("Error removing data from localStorage:", error);
      }
    }

    if (confirmed) {
      try {
        localStorage.setItem("Contact&Shipping", JSON.stringify(formData));
      } catch (error) {
        console.log("Error saving form data to localStorage:", error);
      }
    }
  };

  ////////////////////////////////////////////////

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
          <div className="d-flex align-items-center justify-content-center">
            <div className="card border-0">
              <div
                className="card-body px-5"
                style={{ width: "70vw", maxWidth: 800 }}
              >
                <form onSubmit={handleSubmit}>
                  {/* Form content */}
                  <div className="container mb-4 p-0">
                    <h5 style={{ color: "#8b4403", fontWeight: "bold" }}>
                      Contact information
                    </h5>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter text"
                      required
                      defaultValue={userTokenInfo?.full_name}
                      onBlur={handleUsername}
                    />
                    <label htmlFor="name">Full Name</label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.name}
                      </span>
                    </p>
                  </div>
                  <div className="form-floating my-4">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      required
                      placeholder="Enter Email Address"
                      defaultValue={userTokenInfo?.email}
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
                      className="form-control"
                      id="phone"
                      required
                      placeholder="Mobile Number"
                      onBlur={handlePhone}
                    />
                    <label htmlFor="phone">Mobile Number</label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.phone}
                      </span>
                    </p>
                  </div>
                  {/* Shipping address */}
                  <div className="container p-0 mb-4 mt-5">
                    <h5 style={{ color: "#8b4403", fontWeight: "bold" }}>
                      Shipping address
                    </h5>
                  </div>
                  <div className="form-floating my-4">
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      required
                      placeholder="Enter City"
                      onBlur={handlecity}
                    />
                    <label htmlFor="city">City</label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.city}
                      </span>
                    </p>
                  </div>
                  <div className="form-floating my-4">
                    <input
                      type="text"
                      className="form-control"
                      id="street_name"
                      required
                      placeholder="Enter Street Name"
                      onBlur={handleStName}
                    />
                    <label htmlFor="street_name">Street Name</label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.street_name}
                      </span>
                    </p>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="postalCode"
                      required
                      maxLength="5"
                      placeholder="Enter text"
                      onBlur={handlePostal}
                    />
                    <label htmlFor="postalCode">Postal code</label>
                    <p className="mt-2 text-sm text-danger">
                      <span className="font-weight-medium">
                        {massageWarning.postal_code}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex flex-row my-4 justify-content-between">
                    <button className="login-btn" type="submit">
                      Back To Cart
                    </button>
                    <button className="login-btn" type="submit">
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CheckOut;
