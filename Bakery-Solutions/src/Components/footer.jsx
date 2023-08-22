import "../Style/footer.css";
import twitter from "../images/twitter-icon.png";
import facebook from "../images/facebook-icon.png";
import instagram from "../images/instagram logo_icon.png";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <>
      {/* Start Footer */}
      <footer className="text-center text-lg-start">
        <section className="group1 flex-wrap d-flex justify-content-center justify-content-lg-between">
          <div className="d-lg-block text-center">
            <p className="mt-5 mx-3">
              <i
                className="fas fa-phone fs-4 me-3"
                style={{ color: "#8b4403" }}
              />
              <span>Contact-Us</span>
              <br />
              <hr />
              05 534 567 88 <br /> 07 772 377 56
            </p>
          </div>
          <div className="d-lg-block text-center">
            <p className="mt-5 mx-3">
              <i
                className="fas fa-envelope fs-4 me-3"
                style={{ color: "#8b4403" }}
              />
              <span>Email</span>
              <br />
              <hr />
              <a
                href="mailto:BakerySol@mail.com"
                style={{ textDecoration: "none" }}
              >
                BakerySol@mail.com
              </a>{" "}
              <br />
              <a
                href="mailto: BakerySol@mail.Org"
                style={{ textDecoration: "none" }}
              >
                {" "}
                BakerySol@mail.Org
              </a>
            </p>
          </div>
          <div className="d-lg-block">
            <p className="mt-5 mx-3">
              <span>Follow-Us</span>
              <br />
            </p>
            <hr />
            <a
              href="https://www.instagram.com/magnoliabakery/"
              target="_blank"
              rel="noreferrer"
            >
              <img className="w-25" src={instagram} alt="#" />
            </a>
            <a
              href="https://web.facebook.com/MagnoliaBakery/?locale=ar_AR&_rdc=1&_rdr"
              className="mx-2"
              target="_blank"
              rel="noreferrer"
            >
              <img className="w-25" src={facebook} alt="#" />
            </a>
            <a
              href="https://twitter.com/magnoliabakery"
              target="_blank"
              rel="noreferrer"
            >
              <img className="w-25" src={twitter} alt="#" />
            </a>
          </div>
        </section>
        <div className="container">
          <hr />
        </div>
        <section className="group1 flex-wrap d-flex justify-content-center">
          <div className="d-lg-block">
            <p className="mx-5">
              <a className="text-decoration-none" href="">
                Privacy Policy
              </a>
            </p>
          </div>
          <div className=" d-lg-block">
            <p className="mx-5">
              <a className="text-decoration-none" href="">
                Terms of Use
              </a>
            </p>
          </div>
          <div className=" d-lg-block">
            <p className="mx-5">
              <a className="text-decoration-none" href="">
                Sales and Refunds
              </a>
            </p>
          </div>
          <div className="d-lg-block">
            <p className="mx-5">
              <a className="text-decoration-none" href="">
                Legal
              </a>
            </p>
          </div>
        </section>
        <div className="Copyright text-center p-4">
          © 2023 Copyright:
          <HashLink className="text-reset fw-bold" to="/#">
            Bakery-Solutions.com
          </HashLink>
        </div>
      </footer>
      {/* End Footer */}
    </>
  );
}

export default Footer;
