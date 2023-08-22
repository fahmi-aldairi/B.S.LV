import { HashLink } from "react-router-hash-link";
import pageLogo from "../../images/Group9.png";

function CartEmpty() {
  return (
    <>
      <main className="container-fluid d-flex justify-content-center">
        <div
          className="container login-cont position-relative"
          style={{ width: "80%", borderRadius: 20 }}
        >
          <img
            src={pageLogo}
            alt="#"
            style={{ width: "15%", maxWidth: 85, margin: "15px 0 0 0" }}
          />
          <div
            className="d-flex align-items-top justify-content-center"
            style={{ minHeight: "50vh", color: "#8b440399" }}
          >
            <div className="text-center" style={{ width: "80%" }}>
              <h2
                style={{ fontWeight: "bolder", fontFamily: " Berkshire Swash" }}
              >
                Your Cart Is Empty
              </h2>
              <h1
                style={{
                  fontWeight: "bolder",
                  color: "#8B4403",
                  fontFamily: " Berkshire Swash",
                }}
              >
                Find out what we can do to keep your products awesome with our
                amazing material
              </h1>
              <div className="d-flex flex-row my-4 justify-content-center mt-5">
                <HashLink smooth to="/Raw2/#" style={{textDecoration:"none"}}>
                  <button className="login-btn" type="submit">
                    Our material
                  </button>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CartEmpty;
