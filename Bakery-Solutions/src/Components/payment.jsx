import pageLogo from "../images/Group9.png";
import cash from "../images/cash_money_payment_wallet.png";
import visa from "../images/visa.png";
import { HashLink } from "react-router-hash-link";

function Payment() {


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
                <form onSubmit={""}>
                  <div className="container p-0">
                    <h5 style={{ color: "#8b4403", fontWeight: "bold" }}>
                      Payment Methods
                    </h5>
                  </div>
                  <div className="form-check" style={{ margin: "1rem 2rem" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      <img
                        src={visa}
                        alt=""
                        style={{
                          width: 40,
                          position: "relative",
                          top: "-5px",
                          marginRight: "4px",
                        }}
                      />
                      <span> Credit Card</span>
                    </label>
                  </div>
                  <div className="form-check" style={{ margin: "1rem 2rem" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      <img
                        src={cash}
                        alt=""
                        style={{
                          position: "relative",
                          top: "-5px",
                          width: 20,
                          marginRight: "10px",
                        }}
                      />
                      <span>Cash</span>
                    </label>
                  </div>
                  <div className="form-floating my-4">
                    <input
                      type="text"
                      className="form-control"
                      id="FirstName"
                      name="firstName"
                      placeholder="Enter First Name"
                      // value={formData.firstName}
                      // onChange={handleChange}
                    />
                    <label htmlFor="FirstName">Name On Card</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="CridetNum"
                      name="creditCardNum"
                      placeholder="Enter Credit Card Number"
                      // value={formData.creditCardNum}
                      // onChange={handleChange}
                    />
                    <label htmlFor="CridetNum">Credit Card Number</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="SecurityCode"
                      name="securityCode"
                      placeholder="Enter Security Code"
                      // value={formData.securityCode}
                      // onChange={handleChange}
                    />
                    <label htmlFor="SecurityCode">Security Code</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="EXP"
                      name="expiration"
                      placeholder="Enter Card Expiration"
                      // value={formData.expiration}
                      // onChange={handleChange}
                    />
                    <label htmlFor="EXP">Card Expiration</label>
                  </div>
                  <div className="d-flex flex-row flex-wrap justify-content-between mt-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="defaultCheck1"
                        name="saveInfo"
                        // checked={formData.saveInfo}
                        // onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        Save this information for next time
                      </label>
                    </div>
                  </div>
                  <div className="d-flex flex-row my-4 justify-content-end">
                    <HashLink smooth to="/#" style={{ textDecoration: "none" }}>
                      <button className="login-btn" type="submit">
                        Submit Order
                      </button>
                    </HashLink>
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

export default Payment;
