/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../Style/cart.css";
import pageLogo from "../images/Group9.png";
import { HashLink } from "react-router-hash-link";
import Swal from "sweetalert2";
import CartEmpty from "./SubComponents/CartEmpty";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

const notifySucess = () => {
  Swal.fire({
    title: "<strong>Product is deleted Successfully</strong>",
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
      title: "Are you sure you want to delete this Product?",
      color: "#8B4403",
      icon: "warning",
      iconColor: "#FFD966",
      showCancelButton: true,
      confirmButtonColor: "#8B4403",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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

function Cart() {
  const { auth, setAuth } = useContext(AuthContext);
  const [cartData, setcartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleRemoveItem = async (i) => {
    const confirmed = await showConfirmationPrompt();
    // console.log(i);
    if (confirmed) {
      if (i === 0) {
        const updatedCartData = [...cartData];
        updatedCartData.splice(i, 1);
        setcartData(updatedCartData);
        localStorage.removeItem("cart");
        return;
      }
      const updatedCartData = [...cartData];
      updatedCartData.splice(i, 1);
      setcartData(updatedCartData);
      localStorage.setItem("cart", JSON.stringify(updatedCartData));
    }
  };

  const [quantity, setQuantity] = useState(1);

  const subtotal = cartData.reduce(
    (acc, item) => Number(acc + Number(item.totalPrice)),
    0
  );

  const charge = cartData.reduce(
    (acc, item) => Number(acc + Number(item.charge) * item.count),
    0
  );

  const increment = (i) => {
    const product_count = cartData[i].product_count;
    const count = cartData[i].count;
    if (count < product_count) {
      const updatedQuantity = cartData[i].count + 1;
      cartData[i].count = updatedQuantity;
      cartData[i].totalPrice =
        cartData[i].discount === null || cartData[i].discount === ""
          ? cartData[i].count * cartData[i].product_price
          : cartData[i].count * cartData[i].discount;
      setQuantity(updatedQuantity);
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  const decrement = (i) => {
    const count = cartData[i].count;
    if (count > 1) {
      const updatedQuantity = cartData[i].count - 1;
      cartData[i].count = updatedQuantity;
      cartData[i].totalPrice =
        cartData[i].discount === null || cartData[i].discount === ""
          ? cartData[i].count * cartData[i].product_price
          : cartData[i].count * cartData[i].discount;
      setQuantity(updatedQuantity);
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  let totalToPaid = 0;

  const freeShip = subtotal > 100 ? 0 : 100 - subtotal;

  totalToPaid = freeShip <= 0 ? subtotal : subtotal + charge;

  console.log(freeShip);
  console.log(totalToPaid);
  useEffect(() => {
    if (totalToPaid === 0) {
      localStorage.removeItem("totalPaid");
    } else {
      localStorage.setItem("totalPaid", totalToPaid);
    }
  }, [totalToPaid]);

  return (
    <>
      {subtotal > 0 ? (
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
                    className="card-body p-0"
                    style={{ width: "70vw", maxWidth: 800 }}
                  >
                    <h1
                      className="text-center"
                      style={{ color: "#8b4403", fontWeight: "bold" }}
                    >
                      Your Cart
                    </h1>
                    <div className="d-flex flex-column col-xl-10 mb-5 mt-5">
                      <p style={{ color: "#8b4403" }}>
                        {freeShip <= 0 ? (
                          <>{`You have Free shipping!`}</>
                        ) : (
                          <>{`You're away ${freeShip} Jd from free shipping!`}</>
                        )}
                      </p>
                      <div
                        className="d-flex flex-row justify-content-start"
                        style={{
                          width: "calc(100% - 200px)",
                          height: "2rem",
                          backgroundColor: "#efefef",
                          borderRadius: 10,
                          boxShadow: "0 0 10px #8b4403",
                        }}
                      >
                        <div
                          className="position-relative"
                          style={{
                            width: "50%",
                            height: "2rem",
                            backgroundColor: "#8b4403",
                            borderRadius: 10,
                            boxShadow: "inset 0 0 10px #efefef",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="d-flex flex-row justify-content-end position-relative"
                      style={{ color: "#8b4403" }}
                    >
                      <p>Price</p>
                      <p className="tableHead mx-5">Quantity</p>
                      <p>Total</p>
                    </div>
                    <div className="container mb-5 ">
                      {cartData ? (
                        <>
                          {cartData.map((e, i) => {
                            return (
                              <div className="row mb-5 " key={i}>
                                <div className="col">
                                  <div className="row">
                                    <img
                                      src={`http://localhost:5000/images/${e.image}`}
                                      alt=""
                                      style={{ width: 130, height: 130 }}
                                      className="col pe-0 me-3"
                                    />
                                    <div className="col p-0 mt-4">
                                      <p
                                        className="m-0"
                                        style={{ color: "#8b4403" }}
                                      >
                                        {e.product_name}
                                      </p>
                                      <p
                                        className="m-0"
                                        style={{ color: "#8b4403" }}
                                      >
                                        {`${e.product_weight} Kg / item`}
                                      </p>
                                      <button
                                        className="p-0"
                                        style={{
                                          backgroundColor: "transparent",
                                          border: "none",
                                          color: "#6b6b6b",
                                        }}
                                        onClick={() => handleRemoveItem(i)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col d-flex flex-row justify-content-end position-relative p-0"
                                  style={{ color: "#8b4403" }}
                                >
                                  {e.discount === null || e.discount === "" ? (
                                    <>
                                      {" "}
                                      <p>{`${e.product_price} Jd`}</p>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <p>{`${e.discount} Jd`}</p>
                                    </>
                                  )}
                                  <div>
                                    <div
                                      className="input-group d-flex justify-content-center quantity mx-2 align-items-center"
                                      style={{ width: 130 }}
                                    >
                                      <div className="input-group-btn">
                                        <button
                                          className="btn detaBtn btn-minus d-flex justify-content-center align-items-center"
                                          onClick={() => decrement(i)}
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        >
                                          <i className="fa fa-minus" />
                                        </button>
                                      </div>
                                      <span
                                        type="text"
                                        className="mx-2 bg-transparent text-center"
                                      >
                                        {e.count}
                                      </span>
                                      <div className="input-group-btn">
                                        <button
                                          className="btn detaBtn btn-plus d-flex justify-content-center align-items-center"
                                          onClick={() => increment(i)}
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        >
                                          <i className="fa fa-plus" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <p>{`${e.totalPrice} JD`}</p>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="position-relative d-flex justify-content-end">
                      <div className="d-flex flex-column align-items-end priceTot">
                        {subtotal > 0 && (
                          <>
                            {" "}
                            <p
                              className="Subtotal mb-0"
                              style={{ color: "#8b4403" }}
                            >
                              Subtotal: {subtotal} Jd
                            </p>
                          </>
                        )}
                        {freeShip <= 0 ? (
                          <>
                            {" "}
                            <span className="" style={{ color: "#8b4403" }}>
                              Charge: 0 Jd
                            </span>
                          </>
                        ) : (
                          <>
                            {" "}
                            {charge > 0 && (
                              <>
                                {" "}
                                <span className="" style={{ color: "#8b4403" }}>
                                  Charge: {charge} Jd
                                </span>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {totalToPaid > 0 && (
                      <>
                        {" "}
                        <span
                          className="position-relative d-flex justify-content-end mt-3"
                          style={{ color: "#8b4403" }}
                        >
                          To Paid: {totalToPaid} Jd
                        </span>
                      </>
                    )}
                    <div className="d-flex flex-column">
                      {/* <div
                        className="d-flex flex-column my-5"
                        style={{ width: 250 }}
                      >
                        <label htmlFor="story" style={{ color: "#8b4403" }}>
                          Special instructions{" "}
                        </label>
                        <textarea
                          id="story"
                          name="story"
                          rows={5}
                          cols={33}
                          className="mt-2"
                          style={{
                            backgroundColor: "#d9d9d96b",
                            border: "1px solid #8b4403",
                          }}
                          defaultValue={""}
                        />
                      </div> */}
                      <div className="d-flex flex-row mb-4 justify-content-end mt-lg-5 mb-5">
                        <button className="login-btn me-5" type="button">
                          <HashLink
                            to="/Raw2/#"
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            Update Cart
                          </HashLink>
                        </button>
                        {!auth ? (
                          <>
                            <HashLink
                              smooth
                              to="/login/#"
                              style={{ textDecoration: "none" }}
                            >
                              {" "}
                              <button className="login-btn" type="button">
                                Sign in to finish
                              </button>
                            </HashLink>
                          </>
                        ) : (
                          <>
                            {" "}
                            <HashLink
                              smooth
                              to="/checkout/#"
                              style={{ textDecoration: "none" }}
                            >
                              {" "}
                              <button className="login-btn" type="button">
                                Check Out
                              </button>
                            </HashLink>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <CartEmpty />
        </>
      )}
    </>
  );
}

export default Cart;
