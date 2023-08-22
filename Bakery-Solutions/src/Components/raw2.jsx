/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-comment-textnodes */
import "../Style/raw.css";
import { styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import pageLogo from "../images/Group9.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, json } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import { HashLink } from "react-router-hash-link";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Swal from "sweetalert2";

const notifySucess = () => {
  Swal.fire({
    title: "<strong>Product is Add Successfully</strong>",
    position: "top",
    icon: "success",
    iconColor: "#FFD966",
    background: "#FFF2CC",
    color: "#8B4403",
    showConfirmButton: false,
    timer: 2000,
  });
};

/////
const WhiteSeparator = styled("span")({
  backgroundColor: "#fff",
  width: "1px",
  height: "15px",
  margin: "0 8px",
});

const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
  backgroundColor: "#8B4403",
  height: theme.spacing(3.5),
  color: "#fff",
  fontWeight: theme.typography.fontWeightRegular,
  "&:hover, &:focus": {
    backgroundColor: "#FFD966",
    color: "#8B4403",
  },
}));

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid #fff2cc`,
    padding: "0 4px",
    backgroundColor: "#8b4403",
  },
  "&:hover": {
    color: "#8b4403",
  },
}));
/////

function Raw2() {
  const [data, setData] = useState([]);
  const [mainCategoury, setMainCategoury] = useState([]);
  const [allSub, setAllSu] = useState([]);
  const [cakeSub, setCakeSub] = useState([]);
  const [cookiesSub, setCookiesSub] = useState([]);
  const [breadSub, setBreadSub] = useState([]);
  const [paginateCount, setPaginateCount] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [ItemAdded, setItemAdded] = useState();
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCat = (event) => {
    setSelectedCat(event.target.value.split(","));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };
  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllProducts"
        );
        const result = response.data;
        setData(result);
        setPaginateCount(result.length);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/getMainCategories"
        );
        const result = response.data;
        setMainCategoury(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }

      try {
        const response = await axios.get("http://localhost:5000/brSub");
        const result = response.data;
        setBreadSub(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }

      try {
        const response = await axios.get("http://localhost:5000/caSub");
        const result = response.data;
        setCakeSub(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }

      try {
        const response = await axios.get("http://localhost:5000/coSub");
        const result = response.data;
        setCookiesSub(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }

      try {
        const response = await axios.get("http://localhost:5000/allSub");
        const result = response.data;
        setAllSu(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

      fetchData();
    }, []);

  useEffect(() => {
    const stValue = (page - 1) * 6;
    const ndValue = page * 6;
    const filtereddata = data.filter((value) => {
      if (maxPrice && value.product_price > maxPrice) {
        return false;
      }
      if (minPrice && value.product_price < minPrice) {
        return false;
      }
      if (selectedCat[0] && value.category !== selectedCat[0]) {
        return false;
      } else {
        if (selectedCat[1] && value.sub_category !== selectedCat[1]) {
          return false;
        }
        return true;
      }
    });
    const newArray = filtereddata.slice(stValue, ndValue);
    setPerPage(newArray);
  }, [data, page, selectedCat, maxPrice, minPrice]);
  ////////////////////////////////////////////

  // const AddWishList = (perPage) => {
  //   const existingWishList = localStorage.getItem("wishList");
  //   if (existingWishList) {
  //     const list = JSON.parse(existingWishList);
  //     const itemIndex = list.findIndex(
  //       (item) => item.product_id === perPage.product_id
  //     );
  //   }
  // };

  ////////////////////////////////////////////
  const addToCart = async (data) => {
    try {
      const existingCart = localStorage.getItem("cart");
      // console.log(data);

      if (existingCart) {
        const cartData = JSON.parse(existingCart);
        const productIndex = cartData.findIndex(
          (item) => item.product_id === data.product_id
        );

        if (productIndex !== -1) {
          if (data.discount === null || data.discount === "") {
            cartData[productIndex].count += 1;
            cartData[productIndex].totalPrice =
              Number(data.product_price) * cartData[productIndex].count;
          } else {
            cartData[productIndex].count += 1;
            cartData[productIndex].totalPrice =
              Number(data.discount) * cartData[productIndex].count;
          }
        } else {
          if (data.discount === null || data.discount === "") {
            cartData.push({
              ...data,
              count: 1,
              totalPrice: Number(data.product_price),
            });
          } else {
            cartData.push({
              ...data,
              count: 1,
              totalPrice: Number(data.discount),
            });
          }
        }

        localStorage.setItem("cart", JSON.stringify(cartData));
      } else {
        if (data.discount === null || data.discount === "") {
          const cartData = [
            {
              ...data,
              count: 1,
              totalPrice: Number(data.product_price),
            },
          ];
          localStorage.setItem("cart", JSON.stringify(cartData));
        } else {
          const cartData = [
            {
              ...data,
              count: 1,
              totalPrice: Number(data.discount),
            },
          ];
          localStorage.setItem("cart", JSON.stringify(cartData));
        }
      }
      notifySucess();
    } catch {
      console.log("");
    }
    try {
      const cart = localStorage.getItem("cart");
      if (cart) {
        setItemAdded(cart.length);
      }
    } catch {
      console.log("");
    }
  };

  ////////////////////////////////////////////
  const [selectAll, setSelectAll] = useState(false);
  const [selectSub, setSelectSub] = useState("");
  const [showCalss, setShowCalss] = useState("");

  useEffect(() => {
    const getLocal = localStorage?.getItem("selectedHome");
    if (getLocal) {
      setSelectAll(true);
      setSelectSub(getLocal);
      setShowCalss("accordion-collapse collapse show");
      setSelectedCat(["all purpose", selectSub]);
    } else {
      setSelectAll(true);
      setSelectSub("");
      setShowCalss("accordion-collapse collapse");
    }
  }, []);
  // console.log(selectAll);
  // console.log(selectSub);
  // console.log(showCalss);

  useEffect(() => {
    const removeItemFromLocalStorage = () => {
      localStorage.removeItem("selectedHome");
    };
    window.addEventListener("beforeunload", removeItemFromLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", removeItemFromLocalStorage);
    };
  }, []);

  ////////////////////////////////////////////

  return (
    <>
      <main className="mx-4">
        <div className="container-fluid main-container w-100 pb-5">
          <img className="logo mb-0" src={pageLogo} alt="#" />
          <div
            className="text-center prdHdCon mx-auto mb-2"
            style={{ maxWidth: "700px" }}
          >
            <h6 className="text-uppercase mb-2">Bakery-Solutions Products</h6>
            <h1 className="display-6 mb-4">
              Explore The Categories Of Our Products
            </h1>
          </div>
          <div className="d-flex justify-content-center breadcrumb">
            <Breadcrumbs aria-label="breadcrumb" separator={<WhiteSeparator />}>
              <StyledBreadcrumb
                component="a"
                href="/"
                label="Home"
                icon={<HomeIcon fontSize="small" color="#8B4403" />}
              />
              <StyledBreadcrumb component="a" label="Raw Materials" />
            </Breadcrumbs>
          </div>
          <div className="row mainPro gap-4 justify-content-center">
            <div className="col-lg-3 col-md-4 ">
              <div className="flex justify-content-center">
                <div className="d-flex justify-content-center">
                  <ul
                    id="accordionmenu"
                    className="accordion accordion-flush p-0 w-100 mb-0"
                    style={{ listStyle: "none" }}
                  >
                    <li className="accordion-item bg-transparent">
                      {" "}
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#price"
                          aria-expanded="true"
                          style={{ borderRadius: "15px 15px 0 0" }}
                        >
                          By Price
                        </button>
                      </h2>
                      <div
                        id="price"
                        className="accordion-collapse collapse"
                        aria-labelledby="price"
                      >
                        <div className="accordion-body">
                          <ul
                            className="submenu Cakes px-2"
                            style={{ listStyle: "none" }}
                          >
                            <li
                              className="d-flex liCont flex-row align-items-center"
                              style={{
                                marginBottom: "5px",
                              }}
                            >
                              <span
                                style={{ marginRight: "7px" }}
                              >{`Min Price`}</span>
                              <input
                                placeholder="0"
                                type="number"
                                name="Min"
                                min="0"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                                className="select__group"
                              />
                              <span className="">{`JD`}</span>
                            </li>
                            <li className="d-flex liCont flex-row align-items-center">
                              <span
                                style={{ marginRight: "5px" }}
                              >{`Max Price`}</span>
                              <input
                                placeholder="0"
                                type="number"
                                min={minPrice}
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                                className="select__group"
                              />
                              <span className="">{`JD`}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    {mainCategoury.map((cat, index) => (
                      <>
                        {" "}
                        <li
                          className="accordion-item bg-transparent"
                          key={cat[index]}
                        >
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#${cat.category
                                .toUpperCase()
                                .replace(/\s/g, "")}`}
                              aria-expanded="true"
                            >
                              {cat.category.toUpperCase()}
                            </button>
                          </h2>
                          <div
                            id={cat.category.toUpperCase().replace(/\s/g, "")}
                            // className="accordion-collapse collapse"
                            className={
                              cat.category === "all purpose" &&
                              selectAll === true
                                ? showCalss
                                : "accordion-collapse collapse"
                            }
                            aria-labelledby={cat.category
                              .toUpperCase()
                              .replace(/\s/g, "")}
                          >
                            <div className="accordion-body">
                              <ul
                                className="submenu Cakes px-2"
                                style={{ listStyle: "none" }}
                              >
                                {cat.category === "all purpose" ? (
                                  <>
                                    {allSub.map((all) => (
                                      <li>
                                        <button
                                          className="SubCatBTN"
                                          href="#"
                                          value={[
                                            cat.category,
                                            all.sub_category,
                                          ]}
                                          onClick={handleCat}
                                        >
                                          {all.sub_category}
                                        </button>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {cat.category === "cake" ? (
                                  <>
                                    {cakeSub.map((cake) => (
                                      <li>
                                        <button
                                          className="SubCatBTN"
                                          href="#"
                                          value={[
                                            cat.category,
                                            cake.sub_category,
                                          ]}
                                          onClick={handleCat}
                                        >
                                          {cake.sub_category}
                                        </button>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {cat.category === "bread" ? (
                                  <>
                                    {breadSub.map((bread) => (
                                      <li>
                                        <button
                                          className="SubCatBTN"
                                          href="#"
                                          value={[
                                            cat.category,
                                            bread.sub_category,
                                          ]}
                                          onClick={handleCat}
                                        >
                                          {bread.sub_category}
                                        </button>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {cat.category === "cookies" ? (
                                  <>
                                    {cookiesSub.map((coo) => (
                                      <li>
                                        <button
                                          className="SubCatBTN"
                                          href="#"
                                          value={[
                                            cat.category,
                                            coo.sub_category,
                                          ]}
                                          onClick={handleCat}
                                        >
                                          {coo.sub_category}
                                        </button>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </ul>
                            </div>
                          </div>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col d-flex flex-row flex-wrap gap-1 gap-md-4 justify-content-center">
              {perPage.map((data) => (
                <>
                  <div className="col-lg-3 col-md-6 pb-1">
                    <div
                      className="product-item bg-light"
                      key={data.product_id}
                    >
                      <div className="product-img position-relative overflow-hidden">
                        <img
                          className="img-fluid w-100"
                          src={`http://localhost:5000/images/${data.image}`}
                          alt="image"
                        />
                        <div className="product-action">
                          <button
                            className="btn btn-outline-dark btn-square"
                            onClick={() => addToCart(data)}
                          >
                            <i className="fa fa-shopping-cart" />
                          </button>
                          <button
                            className="btn btn-outline-dark btn-square"
                            // onClick={() => AddWishList(perPage)}
                          >
                            <i className="far fa-heart" />
                          </button>
                          <Link
                            className="btn btn-outline-dark btn-square"
                            to={`/prodDetails/${data.product_id}`}
                          >
                            <i className="fa-solid fa-expand"></i>
                          </Link>
                        </div>
                      </div>
                      <div
                        className="text-center py-4"
                        style={{ color: "#8b4403" }}
                      >
                        {data.discount === null || data.discount === "" ? (
                          <>
                            {" "}
                            <div className="d-flex align-items-center justify-content-center mt-2">
                              <h5 className="me-2">{data.product_price} Jd</h5>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div className="d-flex align-items-center justify-content-center mt-2">
                              <h5 className="me-2">{data.discount} Jd</h5>
                              <h6 className="text-muted">
                                <del>{data.product_price} Jd</del>
                              </h6>
                            </div>
                          </>
                        )}
                        <h6 className="h6 text-decoration-none px-2">
                          {data.product_name}
                        </h6>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="d-flex mt-3 justify-content-center">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(data.length / 6)}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </div>
      </main>
      {localStorage.getItem("cart") && (
        <HashLink
          smooth
          to="/cart/#"
          className="btn btn-lg btn-lg-square rounded-circle back-to-top"
        >
          <IconButton
            aria-label="cart"
            style={{ fontSize: "2rem", width: "4rem", height: "4rem" }}
          >
            <StyledBadge
              badgeContent={
                localStorage.getItem("cart")
                  ? JSON.parse(localStorage.getItem("cart")).length
                  : 0
              }
              color="primary"
            >
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </HashLink>
      )}
      <ToastContainer autoClose={2000} limit={1} hideProgressBar={true} />
    </>
  );
}

export default Raw2;
