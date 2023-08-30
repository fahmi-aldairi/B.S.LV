/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import pageLogo from "../images/Group9.png";
import { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const notifySucess = () => {
  Swal.fire({
    title:
      "<strong>Thank You, Your Payment Was Done Successfully, You Will receive your order in 24 hours....</strong>",
    position: "top",
    icon: "success",
    iconColor: "#FFD966",
    background: "#FFF2CC",
    color: "#8B4403",
    showConfirmButton: false,
    timer: 2000,
  });
};

function Pay() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("visa");
  const [focus, setFocus] = useState("");
  const [userCart, setUserCart] = useState([]);
  const [massageWarning, setMassageWarning] = useState({
    name_card: "",
    card_number: "",
    phone: "",
    security_code: "",
    card_expiration_date: "",
  });

  const [dataToOrder, setDataToOrder] = useState({
    user_id: "",
    product_id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    street_name: "",
    postal_code: "",
    pay_method: tab,
    name_card: "",
    card_number: "",
    security_code: "",
    card_expiration_date: "",
  });
  const [dataToPay, setDatatoPay] = useState({
    user_id: "",
    total_paid: "",
  });

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: `Are you sure to submit your order for which the total price is ${dataToPay.total_paid} JD?`,
        color: "#8B4403",
        icon: "warning",
        iconColor: "#FFD966",
        showCancelButton: true,
        confirmButtonColor: "#8B4403",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Submit!",
        background: "#FFF2CC",
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
          localStorage.removeItem("quantity");
          localStorage.removeItem("totalPaid");
          localStorage.removeItem("cart");
          localStorage.removeItem("Contact&Shipping");
          notifySucess();
          navigate("/");
        } else {
          resolve(false);
        }
      });
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDataToOrder((prevState) => ({
          ...prevState,
          user_id: decodedToken.user_id,
        }));
        setDatatoPay((prevState) => ({
          ...prevState,
          user_id: decodedToken.user_id,
        }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const contactShippingData = JSON.parse(
      localStorage?.getItem("Contact&Shipping")
    );
    setDataToOrder((prevState) => ({
      ...prevState,
      name: contactShippingData.name,
      email: contactShippingData.email,
      phone: contactShippingData.phone,
      city: contactShippingData.city,
      street_name: contactShippingData.street_name,
      postal_code: contactShippingData.postal_code,
    }));
  }, {});

  useEffect(() => {
    const cartData = JSON.parse(localStorage?.getItem("cart"));
    setUserCart(cartData);
  }, []);

  // console.log(userCart);

  const [updatedPrdIds, setUpdatedPrdIds] = useState([]);
  const [newPrdCount, setNewPrdCount] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage?.getItem("cart"));
    const prdArray = [];
    const userCount = [];
    const savedCount = [];
    const array = cart.map((ele) => {
      prdArray.push(ele.product_id);
      userCount.push(ele.count);
      savedCount.push(ele.product_count);
    });

    const newCount = [];
    for (let i = 0; i < savedCount.length; i++) {
      newCount.push(savedCount[i] - userCount[i]);
    }

    setUpdatedPrdIds(prdArray);
    setNewPrdCount(newCount);
    // console.log(prdArray);
    // console.log(newCount);
    // console.log(userCount);
    // console.log(savedCount);
  }, []);

  // console.log(updatedPrdIds);
  // console.log(newPrdCount);

  useEffect(() => {
    const ids = [];
    userCart?.forEach((item) => {
      ids.push(item.product_id);
    });
    setDataToOrder((prevState) => ({
      ...prevState,
      product_id: ids,
    }));
  }, [userCart]);

  ///////////////////////////////////////////////////

  useEffect(() => {
    const totalPaid = JSON.parse(localStorage?.getItem("totalPaid"));
    setDatatoPay((prevState) => ({
      ...prevState,
      total_paid: totalPaid,
    }));
  }, []);

  ///////////////////////////////////////////////////

  ///////////////////////////////////////////////////

  function handleTabChange(newTab) {
    setTab(newTab);
    setDataToOrder((prevState) => ({
      ...prevState,
      pay_method: newTab,
    }));
  }

  ///////////////////////////////////////////////////

  const handleNameCard = (event) => {
    const pattern = /^[a-zA-Z]+$/;
    const name = event.target.value;

    if (name === "") {
      setMassageWarning({ ...massageWarning, name_card: "Required!" });
    } else if (!pattern.test(name)) {
      setMassageWarning({ ...massageWarning, name_card: "Invalid Name" });
    } else {
      setMassageWarning({ ...massageWarning, name_card: "" });
    }
    setDataToOrder((prevState) => ({
      ...prevState,
      name_card: name,
    }));
  };

  const handleCardNumber = (event) => {
    const pattern = /^\d{16}$/;
    const number = event.target.value;

    if (number === "") {
      setMassageWarning({ ...massageWarning, card_number: "Required!" });
    } else if (!pattern.test(number)) {
      setMassageWarning({ ...massageWarning, card_number: "Invalid number" });
    } else {
      setMassageWarning({ ...massageWarning, card_number: "" });
    }
    setDataToOrder((prevState) => ({
      ...prevState,
      card_number: number,
    }));
  };
  const handledate = (event) => {
    const pattern = /^(?:0[1-9]|1[0-2])\/(?:2[4-9]|[3-9]\d|\d{3,})$/;
    const date = event.target.value;

    if (date === "") {
      setMassageWarning({
        ...massageWarning,
        card_expiration_date: "Required!",
      });
    } else if (!pattern.test(date)) {
      setMassageWarning({
        ...massageWarning,
        card_expiration_date: "Invalid Date",
      });
    } else {
      setMassageWarning({ ...massageWarning, card_expiration_date: "" });
    }
    setDataToOrder((prevState) => ({
      ...prevState,
      card_expiration_date: date,
    }));
  };
  const handleCvc = (event) => {
    const pattern = /^\d{3}$/;
    const cvc = event.target.value;

    if (cvc === "") {
      setMassageWarning({
        ...massageWarning,
        security_code: "Required!",
      });
    } else if (!pattern.test(cvc)) {
      setMassageWarning({
        ...massageWarning,
        security_code: "Invalid CVC",
      });
    } else {
      setMassageWarning({ ...massageWarning, security_code: "" });
    }
    setDataToOrder((prevState) => ({
      ...prevState,
      security_code: cvc,
    }));
  };
  ///////////////////////////////////////////////////

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      try {
        const response = await axios.post(
          "http://localhost:5000/newOrder",
          dataToOrder
        );
        console.log("data Send Successfuly");
        console.log(response);
        event.target.reset();
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.post(
          "http://localhost:5000/newPay",
          dataToPay
        );
        console.log("data Send Successfuly");
        console.log(response);
        event.target.reset();
      } catch (error) {
        console.log(error);
      }
      try {
        for (let i = 0; i < updatedPrdIds.length; i++) {
          try {
            const response = await axios.put(
              "http://localhost:5000/updateprdByuser",
              {
                product_id: updatedPrdIds[i],
                newproductCount: newPrdCount[i],
              }
            );
            console.log("data Send Successfuly");
            console.log(response);
            event.target.reset();
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  ///////////////////////////////////////////////////
  console.log(dataToOrder);

  const handleCashBtn = async () => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      try {
        const response = await axios.post("http://localhost:5000/newOrder", {
          user_id: dataToOrder.user_id,
          product_id: dataToOrder.product_id,
          name: dataToOrder.name,
          email: dataToOrder.email,
          phone: dataToOrder.phone,
          city: dataToOrder.city,
          street_name: dataToOrder.street_name,
          postal_code: dataToOrder.postal_code,
          pay_method: dataToOrder.pay_method,
        });
        console.log("data Send Successfuly");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.post(
          "http://localhost:5000/newPay",
          dataToPay
        );
        console.log("data Send Successfuly");
        console.log(response);
        event.target.reset();
      } catch (error) {
        console.log(error);
      }
      try {
        for (let i = 0; i < updatedPrdIds.length; i++) {
          try {
            const response = await axios.put(
              "http://localhost:5000/updateprdByuser",
              {
                product_id: updatedPrdIds[i],
                newproductCount: newPrdCount[i],
              }
            );
            console.log("data Send Successfuly");
            console.log(response);
            event.target.reset();
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <main className="container-fluid d-flex justify-content-center">
        <div
          className="container login-cont"
          style={{ width: "100%", borderRadius: 20 }}
        >
          <img
            src={pageLogo}
            alt="#"
            style={{ width: "15%", maxWidth: 85, margin: "15px 0" }}
          />
          <div className="d-flex align-items-center justify-content-center mb-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <div className="btn-group d-flex justify-content-center">
                <button
                  className="btn login-btn"
                  onClick={() => handleTabChange("visa")}
                >
                  Visa
                </button>
                <button
                  className="btn login-btn"
                  onClick={() => handleTabChange("Cash")}
                >
                  Cash
                </button>
              </div>
              <div className="mt-3">
                {tab === "visa" && (
                  <div className="cardPayment">
                    <div className="card-body">
                      <Cards
                        cvc={dataToOrder.security_code}
                        expiry={dataToOrder.card_expiration_date}
                        number={dataToOrder.card_number}
                        name={dataToOrder.name_card}
                        focused={focus}
                      />
                      <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-1 mt-4">
                          <input
                            className="form-control"
                            type="text"
                            name="name_card"
                            id="name_card"
                            placeholder="Cardholder Name"
                            maxLength="40"
                            value={dataToOrder.name_card}
                            onChange={handleNameCard}
                            onFocus={(e) => setFocus(e.target.name)}
                            // required
                          />
                          <label htmlFor="name_card">Cardholder Name</label>
                          <p className="mt-2 text-sm text-danger">
                            <span className="font-weight-medium">
                              {massageWarning.name_card}
                            </span>
                          </p>
                        </div>
                        <div className="form-floating mb-1 mt-4">
                          <input
                            type="text"
                            className="form-control"
                            id="card_number"
                            name="card_number"
                            value={dataToOrder.card_number}
                            // minLength="16"
                            maxLength="16"
                            placeholder="Card Number"
                            // required
                            onChange={handleCardNumber}
                            onFocus={(e) => setFocus(e.target.name)}
                          />
                          <label htmlFor="card_number">Card Number</label>
                          <p className="mt-2 text-sm text-danger">
                            <span className="font-weight-medium">
                              {massageWarning.card_number}
                            </span>
                          </p>
                        </div>
                        <div className="form-floating mb-1 mt-4">
                          <input
                            className="form-control"
                            type="text"
                            name="card_expiration_date"
                            id="card_expiration_date"
                            placeholder="Expiration Date (MM/YY)"
                            value={dataToOrder.card_expiration_date}
                            minLength="5"
                            maxLength="5"
                            onChange={handledate}
                            onFocus={(e) => setFocus(e.target.name)}
                            // required
                          />
                          <label htmlFor="card_expiration_date">
                            Expiration Date (MM/YY)
                          </label>
                          <p className="mt-2 text-sm text-danger">
                            <span className="font-weight-medium">
                              {massageWarning.card_expiration_date}
                            </span>
                          </p>
                        </div>
                        <div className="form-floating mb-1 mt-4">
                          <input
                            className="form-control"
                            type="text"
                            name="cvc"
                            placeholder="CVC"
                            value={dataToOrder.security_code}
                            minLength="3"
                            maxLength="3"
                            onChange={handleCvc}
                            onFocus={(e) => setFocus(e.target.name)}
                          />
                          <label className="form-label">CVC</label>
                          <p className="mt-2 text-sm text-danger">
                            <span className="font-weight-medium">
                              {massageWarning.security_code}
                            </span>
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="btn login-btn mt-3 col-12"
                          id="checkOutButton"
                        >
                          Pay Now
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {tab === "Cash" && (
                  <div className="card p-3">
                    <div className="card-body d-flex flex-column justify-content-center">
                      <h4
                        className="text-center mb-4"
                        style={{ color: "#8B4403" }}
                      >
                        Please click the button below to Submit Your payment
                      </h4>
                      <button
                        className="btn login-btn my-3"
                        onClick={handleCashBtn}
                      >
                        pay Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Pay;
