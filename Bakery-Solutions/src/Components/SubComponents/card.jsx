/* eslint-disable react/no-unknown-property */

import "../../Style/card.css";
import img from "../../images/service-1.jpg";

function ProductCard() {
  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-2 pb-1">
        <div className="product-item bg-light">
          <div className="product-img position-relative overflow-hidden">
            <img className="img-fluid w-100" src={img} alt="" />
            <div className="product-action">
              <a className="btn btn-outline-dark btn-square" href="">
                <i className="fa fa-shopping-cart" />
              </a>
              <a className="btn btn-outline-dark btn-square" href="">
                <i className="far fa-heart" />
              </a>
            </div>
          </div>
          <div className="text-center py-4" style={{ color: "#8b4403" }}>
            <a className="h6 text-decoration-none text-truncate" href="">
              Product Name Goes Here
            </a>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h5>$123.00</h5>
              <h6 className="text-muted ml-2">
                <del>$123.00</del>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
