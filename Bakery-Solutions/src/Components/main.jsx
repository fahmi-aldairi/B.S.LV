import "../Style/main.css";
import Ellipse3 from "../images/Ellipse3.png";
import bread from "../images/Bread4.png";
import croissant from "../images/croissant.png";
import cake from "../images/cake.png";
import wheat from "../images/wheat.png";
import spread from "../images/spread.png";
import oliveoil from "../images/olive-oil.png";
import cocoa from "../images/cocoa.png";
import { ToastContainer } from "react-toastify";
import Testimonial from "./SubComponents/testimonial";
import { useNavigate } from "react-router-dom";
import HeroSlider from "./heroSlider";

function Main() {
  const navigate = useNavigate();
  const handleSelected = (value) => {
    const isexist = localStorage.getItem("selectedHome");
    if (isexist === true) {
      localStorage.removeItem("selectedHome");
      localStorage.setItem("selectedHome", value);
      navigate("/Raw2");
      window.scrollTo(0, 0);
      return;
    } else {
      localStorage.setItem("selectedHome", value);
      navigate("/Raw2");
      window.scrollTo(0, 0);
    }
  };

  const handleMoreBtn = (value) => {
    localStorage.removeItem("selectedHome");
    localStorage.setItem("selectedMainCat", value);
    navigate("/Raw2");
    console.log(value);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <main>
        <HeroSlider />
        {/* Start Calc-Service */}
        <section className="sec-lable d-flex flex-wrap justify-content-sm-start">
          <div className="d-flex justify-content-center">
            <p>Raw-Materials</p>
          </div>
        </section>
        <section className="Calc-serv">
          <div className="bread-cont container w-75 d-flex flex-row justify-content-between">
            <div className="bread-imgs container position-relative">
              <img className="position-absolute" src={Ellipse3} alt="#" />
              <img className="position-absolute bread" src={bread} alt="#" />
            </div>
            <div className="bread-cards container d-flex flex-column align-items-center">
              <h1>Breads</h1>
              <p>
                Our passion is reflected in our bread that falls apart in your
                mouth, equally flavorful and incomparable to anything you have
                had.
              </p>
              <button
                className="homeBTN"
                onClick={() => handleMoreBtn("bread")}
              >
                More
              </button>
            </div>
          </div>
          <div className="Croissants-cont container w-75 d-flex flex-row justify-content-sm-between">
            <div className="Croissants-cards container d-flex flex-column align-items-center">
              <h1>Cookies</h1>
              <p>
                Satisfy your cravings with the wide range of Croissant menu. Our
                expert chefs know how to achieve the perfect blend of health and
                irresistible taste.
              </p>
              <button
                className="homeBTN"
                onClick={() => handleMoreBtn("cookies")}
              >
                More
              </button>
            </div>
            <div className="container Croissants-img position-relative">
              <img className="position-absolute" src={Ellipse3} alt="#" />
              <img
                className="croissant position-absolute"
                src={croissant}
                alt="#"
              />
            </div>
          </div>
          <div className="cake-cont container w-75 d-flex flex-row justify-content-between">
            <div className="cake-imgs container position-relative">
              <img className="position-absolute" src={Ellipse3} alt="#" />
              <img className="position-absolute cake" src={cake} alt="#" />
            </div>
            <div className="cake-cards container d-flex flex-column align-items-center">
              <h1>Cakes</h1>
              <p>
                We are committed to providing our customers with amazing cakes
                recipes, exceptional value
              </p>
              <button className="homeBTN" onClick={() => handleMoreBtn("cake")}>
                More
              </button>
            </div>
          </div>
        </section>
        {/* End Calc-Service */}
        {/* Start Supplier */}
        <section className="sec-lable d-flex flex-wrap justify-content-sm-start">
          <div className="d-flex justify-content-center">
            <p>Our-Categories</p>
          </div>
        </section>
        <section className="Supplier container mb-5">
          <div>
            <div className="wheat container d-flex flex-column justify-content-center">
              <div className="wheat-img">
                <img src={wheat} />
              </div>
              <div className="circ-d position-relative d-inline-block">
                <span className="circ-S" />
              </div>
              <button
                onClick={() => {
                  handleSelected("flours");
                }}
                className="homeBTN"
              >
                Flours
              </button>
            </div>
          </div>
          <div>
            <div className="spread container d-flex flex-column justify-content-center">
              <div className="spread-img">
                <img src={spread} />
              </div>
              <div className="circ-d position-relative d-inline-block">
                <span className="circ-S" />
              </div>
              <button
                onClick={() => {
                  handleSelected("butters");
                }}
                className="homeBTN"
              >
                Butters
              </button>
            </div>
          </div>
          <div>
            <div className="olive container d-flex flex-column justify-content-center">
              <div className="olive-img">
                <img src={oliveoil} />
              </div>
              <div className="circ-d position-relative d-inline-block">
                <span className="circ-S" />
              </div>
              <button
                onClick={() => {
                  handleSelected("oils");
                }}
                className="homeBTN"
              >
                Oils
              </button>
            </div>
          </div>
          <div>
            <div className="cocoa container d-flex flex-column justify-content-center">
              <div className="cocoa-img">
                <img src={cocoa} />
              </div>
              <div className="circ-d position-relative d-inline-block">
                <span className="circ-S" />
              </div>
              <button
                onClick={() => {
                  handleSelected("cocoas");
                }}
                className="homeBTN"
              >
                Cocoas
              </button>
            </div>
          </div>
        </section>
        {/* End Supplier */}
        {/* Start Partners */}
        <section className="partners pb-5">
          <section
            className="sec-lable d-flex flex-wrap justify-content-sm-start"
            style={{ height: "120px" }}
          >
            <div className="d-flex justify-content-center">
              <p>Our-Partners</p>
            </div>
          </section>
          <div className="container-fluid p-2 overflow-hidden">
            <Testimonial />
          </div>
        </section>
        {/* End Partners */}
        <ToastContainer autoClose={2000} limit={1} hideProgressBar={true} />
      </main>
    </>
  );
}

export default Main;
