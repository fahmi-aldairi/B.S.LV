import { Link } from "react-router-dom";
import icon from "../images/triangle_icon.png";

function ErrorPage() {
  return (
    <div style={{ margin: "5rem" }}>
      <div className="container-xxl py-6">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <img src={icon} alt="error" style={{ width: "20%" }} />
              <h1 className="display-1" style={{ color: "#FFF2CC" }}>
                404
              </h1>
              <h1 className="mb-4" style={{ color: "#FFF2CC" }}>
                Page Not Found
              </h1>
              <p className="mb-4 text-light">
                We’re sorry, the page you have looked for does not exist in our
                website! Maybe go to our home page or try to use a search?
              </p>
              <div className="d-flex justify-content-center">
                <Link
                  className="btn login-btn w-50 rounded-pill py-3 px-5"
                  to="/"
                >
                  Go Back To Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
