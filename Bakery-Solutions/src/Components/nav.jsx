import { Link, useNavigate } from "react-router-dom";
import "../Style/nav.css";
import logo from "../images/Logo.png";
import { useState } from "react";
import { useEffect } from "react";

import Button from "react-bootstrap/Button";
import { HashLink } from "react-router-hash-link";
import Swal from "sweetalert2";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import SearchField from "./SubComponents/searchnav";

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

function Nav() {
  const { auth, setAuth } = useContext(AuthContext);
  const [fixedClass, setfixedClass] = useState("");
  useEffect(() => {
    window.addEventListener("scroll", fixedNav);
  });

  const fixedNav = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 50 ? setfixedClass("fixed-top") : setfixedClass("");
    }
  };
  ////////////
  const navigate = useNavigate();
  const handleLogOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    Swal.fire({
      title: "<strong>You have successfully been logged out</strong>",
      text: "Thank You!",
      position: "top",
      icon: "success",
      iconColor: "#FFD966",
      background: "#FFF2CC",
      color: "#8B4403",
      showConfirmButton: false,
      timer: 2000,
    });
    setAuth(false);
    navigate("/");
  };
  return (
    <>
      <header>
        {/* Start First Navbar */}
        <nav className="first-nav1">
          <div className="container-fluid d-flex px-xxl-5 first-nav">
            <Link to="/">
              <img src={logo} alt="#" />
            </Link>
            <div className="container d-flex justify-content-end">
              <div className="stNavGroup container d-flex justify-content-sm-end align-items-center">
                <div className="row">
                  <div className="col">
                    <SearchField />
                  </div>
                </div>
                <Link className="SignIn fw-bold text-decoration-none" to="cart">
                  {/* <i className="fa-solid fa-cart-shopping fs-3 me-3" /> */}
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
                </Link>
                {!auth ? (
                  <>
                    <Button variant="outline-secondary" to="/">
                      <HashLink
                        className="SignIn mx-2 fw-bold text-decoration-none"
                        to="/login/#"
                      >
                        Sign-In
                      </HashLink>
                    </Button>
                  </>
                ) : (
                  <Button variant="outline-secondary">
                    <HashLink
                      className="SignIn mx-2 fw-bold text-decoration-none"
                      onClick={handleLogOut}
                    >
                      Log-out
                    </HashLink>
                  </Button>
                )}
                {/* <Button variant="outline-secondary">
                  <HashLink
                    className="SignIn mx-2 fw-bold text-decoration-none"
                    to="/login/#"
                  >
                    Sign-Up
                  </HashLink>
                </Button> */}
              </div>
            </div>
          </div>
        </nav>
        {/* End First Navbar */}
        {/* Start Second Navbar */}
        <nav className={`navbar navbar-expand-lg ndNav  ${fixedClass}`}>
          <div className="container d-flex justify-content-center align-content-center">
            <div style={{ width: "10%" }}></div>
            <div className="navbar justify-content-center w-75 p-0">
              <ul className="navbar-nav d-flex flex-row w-100 justify-content-center">
                <li className="nav-item nav-item-1 me-5">
                  <Link className="nav-link fw-bold" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                {/* <li className="nav-item dropdown me-5">
                  <Link
                    className="nav-link dropdown-toggle fw-bold"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Services
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="#">
                        Calc-Service
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Raw Materials
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </ul>
                </li> */}
                {/* <li className="nav-item nav-item-5 me-5">
                  <Link className="nav-link fw-bold" to="Serv">
                    Services
                  </Link>
                </li> */}
                <li className="nav-item nav-item-5 me-5">
                  <Link className="nav-link fw-bold" to="Raw2">
                    Raw Materials
                  </Link>
                </li>
                {/* <li className="nav-item nav-item-5 me-5">
                  <Link className="nav-link fw-bold" to="Raw">
                    Calculator
                  </Link>
                </li> */}
                <li className="nav-item nav-item-2 me-5">
                  <Link className="nav-link fw-bold" to="about">
                    About-Us
                  </Link>
                </li>
                <li className="nav-item nav-item-3 me-5">
                  <Link className="nav-link fw-bold" to="contact">
                    Contact-Us
                  </Link>
                </li>
              </ul>
            </div>
            {!auth ? (
              <>
                <div style={{ width: "10%" }}></div>
              </>
            ) : (
              <>
                {" "}
                <div
                  style={{ width: "10%" }}
                  className="d-flex justify-content-end"
                >
                  {" "}
                  <Link
                    className="SignIn fw-bold text-decoration-none"
                    to="/profile/#"
                  >
                    <IconButton
                      aria-label="cart"
                      style={{
                        fontSize: "2rem",
                        width: "4rem",
                        height: "4rem",
                        padding: "0px",
                      }}
                    >
                      <StyledBadge color="primary">
                        <AccountCircleIcon />
                      </StyledBadge>
                    </IconButton>
                  </Link>
                </div>
              </>
            )}
          </div>
        </nav>
        {/* End Second Navbar */}
        {/* Start Phone Navbar */}
        <nav className="navbar navbar-expand-lg phone-Navbar">
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">
              <img className="w-75" src={logo} alt="" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about/#">
                    About-Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact/#">
                    Contact-Us
                  </Link>
                </li>
                {/* <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Services
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="#">
                        Calc-Service
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Raw Materials
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Something else here
                      </Link>
                    </li>
                  </ul>
                </li> */}
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/Serv/#">
                    Services
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/Raw2/#">
                    Raw Materials
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Cart/#">
                    Cart
                  </Link>
                </li>
                {auth && (
                  <>
                    {" "}
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile/#">
                        Profile
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  {/* <Link className="nav-link" to="/login/#">
                    Sign-In
                  </Link> */}
                  {!auth ? (
                    <>
                      <Link className="nav-link" to="/login/#">
                        Sign-In
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link className="nav-link" to="/" onClick={handleLogOut}>
                        Log-Out
                      </Link>
                    </>
                  )}
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control SearchBox"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline SearchBox rounded-0"
                  type="button"
                >
                  <i className="fa fa-search" style={{ color: "white" }} />
                </button>
              </form>
            </div>
          </div>
        </nav>
        {/* End Phone Navbar */}
      </header>
    </>
  );
}

export default Nav;
