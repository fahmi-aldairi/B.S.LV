import "../Style/main.css";
import Ellipse3 from "../images/Ellipse3.png";
import Vector from "../images/Vector.png";
import Vector1 from "../images/Vector-1.png";
import Vector2 from "../images/Vector-2.png";
import Vector3 from "../images/Vector-3.png";
import croissant from "../images/croissant.png";
import cake from "../images/cake.png";
import wheat from "../images/wheat.png";
import spread from "../images/spread.png";
import oliveoil from "../images/olive-oil.png";
import cocoa from "../images/cocoa.png";
import hero from "../images/hero.png";
import slider from "../images/Silder.jpg";
import slider1 from "../images/slider1.jpg";
import slider2 from "../images/slider2.jpg";
import { ToastContainer } from "react-toastify";
import Testimonial from "./SubComponents/testimonial";
import { useNavigate } from "react-router-dom";

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

  const handleMoreBtn = () => {
    localStorage.removeItem("selectedHome");
    navigate("/Raw2");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <main>
        <section className="hero-overlay">
          <div
            id="carouselExampleIndicators"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={1}
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={2}
                aria-label="Slide 3"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={3}
                aria-label="Slide 4"
              />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={hero} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={slider} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={slider1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={slider2} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <i
                className="fa-solid fa-caret-left fs-1 ms-5"
                style={{ color: "#fff2cc" }}
              />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <i
                className="fa-solid fa-caret-right fs-1 me-5"
                style={{ color: "#fff2cc" }}
              />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
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
              <img className="position-absolute Vec" src={Vector} alt="#" />
              <img className="position-absolute vec1" src={Vector1} alt="#" />
              <img className="position-absolute vec2" src={Vector2} alt="#" />
              <img className="position-absolute vec3" src={Vector3} alt="#" />
            </div>
            <div className="bread-cards container d-flex flex-column align-items-center">
              <h1>Breads</h1>
              <p>
                Our passion is reflected in our bread that falls apart in your
                mouth, equally flavorful and incomparable to anything you have
                had.
              </p>
              <button className="homeBTN" onClick={handleMoreBtn}>
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
              <button className="homeBTN" onClick={handleMoreBtn}>
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
              <button className="homeBTN" onClick={handleMoreBtn}>
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod temp.
              </p>
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod temp.
              </p>
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod temp.
              </p>
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod temp.
              </p>
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
          {/* <div className="container mb-5 mb-md-6">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 text-center">
                <h2 className="display-5">Our Partners</h2>
              </div>
            </div>
          </div> */}
          <div className="container-fluid p-2 overflow-hidden">
            {/* <div className="row gy-5 gy-md-6">
              <div className="col-6 col-md-3 align-self-center text-center">
                <img src="https://www.al-mahmoudia.com/assets/img/partners/par6.png" />
              </div>
              <div className="col-6 col-md-3 align-self-center text-center">
                <img src="https://www.al-mahmoudia.com/assets/img/partners/par9.png" />
              </div>
              <div className="col-6 col-md-3 align-self-center text-center">
                <img src="https://www.al-mahmoudia.com/assets/img/partners/par10.png" />
              </div>
              <div className="col-6 col-md-3 align-self-center text-center">
                <img src="https://www.al-mahmoudia.com/assets/img/partners/par5.png" />
              </div>
              <div className="col-6 col-md-3 align-self-center text-center">
                <img src="https://www.al-mahmoudia.com/assets/img/partners/par21.png" />
              </div>
              <div className="col-6 col-md-3 align-self-center text-center">
                <img src="https://www.al-mahmoudia.com/assets/img/partners/par22.png" />
              </div>
              <div className="col-6 col-md-3 align-self-center text-center">
                <img src="https://www.al-mahmoudia.com/assets/img/partners/par23.png" />
              </div>
              <div className="col-6 col-md-3 align-self-center text-center">
                <img src="https://www.al-mahmoudia.com/assets/img/partners/par25.png" />
              </div>
            </div> */}
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
