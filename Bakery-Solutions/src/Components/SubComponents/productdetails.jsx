/* eslint-disable react-hooks/exhaustive-deps */
import "../../Style/ProductDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { ToastContainer, toast } from "react-toastify";

function ProductDetails() {
  const [data, setdata] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(false);
  let { id } = useParams();
  // console.log(">>>>", id);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(token);
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        const result = response.data;
        setdata(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(data);
  ///////////////////////////////////////////////

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedQuantity = localStorage.getItem("quantity");
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity));
    }
  }, []);

  const increment = () => {
    if (quantity < data[0].product_count) {
      const updatedQuantity = quantity + 1;
      setQuantity(updatedQuantity);
      localStorage.setItem("quantity", updatedQuantity.toString());
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      setQuantity(updatedQuantity);
      localStorage.setItem("quantity", updatedQuantity.toString());
    }
  };

  // setQuantity(1);

  // if (quantity > data.product_count) {
  //   setQuantity(data.product_count);
  // }

  ///////////////////////////////////////////////

  const addToCart = (data) => {
    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      const cartData = JSON.parse(existingCart);
      const productIndex = cartData.findIndex(
        (item) => item.product_id === data.product_id
      );
      console.log(productIndex !== -1);
      if (productIndex !== -1) {
        if (cartData[0].count) {
          cartData[productIndex].count = quantity;
          {
            data.discount === null || data.discount === ""
              ? (cartData[productIndex].totalPrice =
                  quantity * data.product_price)
              : (cartData[productIndex].totalPrice = quantity * data.discount);
          }
          toast.success(
            `${quantity} Item of ${data.product_name.toUpperCase()} has been added to your cart.`
          );
        }
      } else {
        if (data.discount === null || data.discount === "") {
          cartData.push({
            ...data,
            count: quantity,
            totalPrice: quantity * data.product_price,
          });
          toast.success(
            `${quantity} Item of ${data.product_name.toUpperCase()} has been added to your molham cart.`
          );
        } else {
          cartData.push({
            ...data,
            count: quantity,
            totalPrice: quantity * data.discount,
          });
          toast.success(
            `${quantity} Item of ${data.product_name.toUpperCase()} has been added to your abed cart.`
          );
        }
      }

      localStorage.setItem("cart", JSON.stringify(cartData));
    } else {
      if (data.discount === null || data.discount === "") {
        const cartData = [
          {
            ...data,
            count: quantity,
            totalPrice: quantity * Number(data.product_price),
          },
        ];
        localStorage.setItem("cart", JSON.stringify(cartData));
        toast.success(
          `${quantity} Item of ${data.product_name.toUpperCase()} has been added to your cart.`
        );
      } else {
        const cartData = [
          {
            ...data,
            count: quantity,
            totalPrice: quantity * Number(data.discount),
          },
        ];
        localStorage.setItem("cart", JSON.stringify(cartData));
        toast.success(
          `${quantity} Item of ${data.product_name.toUpperCase()} has been added to your cart.`
        );
      }
    }
    const cart = localStorage.getItem("cart");
    if (cart) {
      setIsItemAdded(true);
    }
    localStorage.setItem("quantity", "1");
  };

  return (
    <>
      {data.map((data) => (
        <>
          <div className="my-5" key={data.product_id}>
            <div className="container">
              <div className="row px-xl-5 justify-content-center">
                <div className="col-lg-4 mb-30">
                  <div>
                    <div className="rounded-3">
                      <div
                        className="bgProdDetails"
                        style={{ borderRadius: "15px" }}
                      >
                        <img
                          className="w-100 h-100"
                          src={`http://localhost:5000/images/${data.image}`}
                          alt="Image"
                          style={{ borderRadius: "15px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 h-auto rounded-3">
                  <div
                    className="h-100 bgProdDetails d-flex flex-column justify-content-around p-5"
                    style={{ borderRadius: "15px" }}
                  >
                    <div>
                      <h3>{data.product_name}</h3>
                      {data.discount === null || data.discount === "" ? (
                        <>
                          {" "}
                          <div className="d-flex gap-2 align-items-center">
                            <h3 className="font-weight-semi-bold">
                              {data.product_price} Jd
                            </h3>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className="d-flex gap-2 align-items-center">
                            <h3 className="font-weight-semi-bold">
                              {data.discount} Jd
                            </h3>
                            <h6 className="font-weight-semi-bold text-muted">
                              <del>{data.product_price} Jd</del>
                            </h6>
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <p className="mb-4">{data.product_description}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="input-group quantity me-3"
                        style={{ width: 130 }}
                      >
                        <div className="input-group-btn">
                          <button
                            className="btn detaBtn btn-minus"
                            onClick={decrement}
                          >
                            <i className="fa fa-minus" />
                          </button>
                        </div>
                        <span
                          type="text"
                          className="form-control myForm bg-transparent text-center"
                        >
                          {quantity}
                        </span>
                        <div className="input-group-btn">
                          <button
                            className="btn detaBtn btn-plus"
                            onClick={increment}
                          >
                            <i className="fa fa-plus" />
                          </button>
                        </div>
                      </div>
                      <button
                        className="btn detaBtn px-3"
                        onClick={() => addToCart(data)}
                      >
                        <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
      {isItemAdded === true && (
        <HashLink
          smooth
          to="/cart/#"
          className="btn btn-lg btn-lg-square rounded-circle back-to-top"
          style={{ backgroundColor: "#8b4403" }}
        >
          <i
            className="fa fa-shopping-cart"
            style={{ color: "#fff2cc", fontSize: "1.5rem" }}
          />
        </HashLink>
      )}
      <ToastContainer autoClose={2000} limit={1} hideProgressBar={true} />
    </>
  );
}

export default ProductDetails;
