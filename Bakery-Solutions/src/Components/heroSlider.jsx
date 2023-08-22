import hero from "../images/hero.png";
import slider from "../images/Silder.jpg";
import slider1 from "../images/slider1.jpg";
import slider2 from "../images/slider2.jpg";

function HeroSlider() {
  return (
    <>
      {" "}
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
            <div
              className="carousel-item active"
              style={{ position: "relative" }}
            >
              <img src={hero} className="d-block w-100" alt="HeroImg" />
              <div className="containerSlider">
                <h1>Explor high quality products</h1>
              </div>
            </div>
            <div className="carousel-item">
              <img src={slider} className="d-block w-100" alt="HeroImg" />
              <div className="containerSlider">
                <h1>Know About Bakery-Solutions & Our History</h1>
              </div>
            </div>
            <div className="carousel-item">
              <img src={slider1} className="d-block w-100" alt="HeroImg" />
              <div className="containerSlider">
                <h1>Know About Bakery-Solutions & Our History</h1>
              </div>
            </div>
            <div className="carousel-item">
              <img src={slider2} className="d-block w-100" alt="HeroImg" />
              <div className="containerSlider">
                <h1>Know About Bakery-Solutions & Our History</h1>
              </div>
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
    </>
  );
}

export default HeroSlider;
