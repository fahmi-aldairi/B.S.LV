import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
} from "@material-tailwind/react";

export function Navbar({ brandName, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <MTNavbar className="p-3" style={{ background: "#dad1b3" }}>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/" className="flex">
          <img src="../../../public/img/Group9.png" alt="image" width={50} />
          <Typography
            variant="small"
            className=" ml-4 flex cursor-pointer items-center py-1.5 text-lg font-bold"
            style={{ color: "#8B4403" }}
          >
            {brandName}
          </Typography>
        </Link>
        {React.cloneElement(action, {
          className: "hidden lg:inline-block",
        })}
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {React.cloneElement(action, {
            className: "w-full block lg:hidden",
          })}
        </div>
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "Bakery-Solutions",
  action: (
    <a
      href="https://www.creative-tim.com/product/material-tailwind-dashboard-react"
      target="_blank"
    ></a>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
