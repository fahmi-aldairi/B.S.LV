/* eslint-disable react/no-unescaped-entities */
import "../Style/About.css";
import img1 from "../images/service-1.jpg";
import img2 from "../images/service-2.jpg";
import img3 from "../images/service-3.jpg";
import img4 from "../images/service.png";
import img5 from "../images/product.png";
import img6 from "../images/banner-1.jpg";
import img7 from "../images/banner-2.jpg";
import img8 from "../images/team-1.jpg";
import img9 from "../images/team-2.jpg";
import img10 from "../images/team-3.jpg";
// import ArrUP from "../images/ArrowUp.png";
////////////
import { styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
////////////

const WhiteSeparator = styled("span")({
  backgroundColor: "#fff",
  width: "1px",
  height: "15px",
  margin: "0 8px",
});

const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
  backgroundColor: "#8B4403",
  height: theme.spacing(3.5),
  color: "#fff",
  fontWeight: theme.typography.fontWeightRegular,
  "&:hover, &:focus": {
    backgroundColor: "#FFD966",
    color: "#8B4403",
  },
}));

function About() {
  return (
    <>
      <div className="AboutCont">
        {/* Page Header Start */}
        <div
          className="container-fluid page-header py-6 d-flex flex-column-reverse justify-content-center "
          data-wow-delay="0.1s"
        >
          <div className="container text-center py-5">
            <h1 className="display-4 mb-3" style={{ color: "#FFD966" }}>
              About-Us
            </h1>
            <div className="d-flex justify-content-center">
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<WhiteSeparator />}
              >
                <StyledBreadcrumb
                  component="a"
                  href="/"
                  label="Home"
                  icon={<HomeIcon fontSize="small" color="#8B4403" />}
                />
                <StyledBreadcrumb component="a" label="About-Us" />
              </Breadcrumbs>
            </div>
          </div>
        </div>
        {/* Page Header End */}
        {/* About Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-5 align-items-end">
              <div className="col-lg-6">
                <div className="row g-2">
                  <div className="col-6 position-relative">
                    <div className="about-experience rounded">
                      <h1 className="display-1 mb-0">25</h1>
                      <small className="fs-5 fw-bold text-center">
                        Years Experience
                      </small>
                    </div>
                  </div>
                  <div className="col-6">
                    <img className="img-fluid rounded" src={img1} />
                  </div>
                  <div className="col-6">
                    <img className="img-fluid rounded" src={img2} />
                  </div>
                  <div className="col-6">
                    <img className="img-fluid rounded" src={img3} />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h1 className="para mb-4">
                  Know About Bakery-Solutions & Our History
                </h1>
                <p className="mb-4 text-light">
                  Bakery & Company began baking Confectionery products in low
                  volume bakery facilities. The original handmade pastries,
                  cakes and sandwiches have always used the finest quality. 100%
                  natural healthy ingredients: Highest quality flour, Fresh
                  whole grade A eggs, butter creams and dairy products, pure
                  cane sugar, dark and white chocolates, fresh fruit purees and
                  fillings, the world's finest vanilla and essences.
                </p>
                <div className="row g-5 pt-2 mb-5">
                  <div className="col-sm-6">
                    <img className="img-fluid mb-4" src={img4} alt="" />
                    <h5 className="mb-3 para">Dedicated Services</h5>
                    <span className="text-light">
                      Exemplary customer service delights clients, forging
                      lasting bonds through genuine care and efficiency.
                    </span>
                  </div>
                  <div className="col-sm-6">
                    <img className="img-fluid mb-4" src={img5} alt="" />
                    <h5 className="mb-3 para">High Quality Products</h5>
                    <span className="text-light">
                      Quality Assurance Program is an internal structure that
                      conducts a variety of inspections
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* About End */}
        {/* Banner Start */}
        <div className="container-fluid banner my-5 py-5">
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="row g-4 align-items-center">
                  <div className="col-sm-4">
                    <img className="img-fluid rounded" src={img6} alt="" />
                  </div>
                  <div className="col-sm-8">
                    <h2 className="text-white mb-3">
                      We Sell Best Dairy Products
                    </h2>
                    <p className="text-white mb-4">
                      Finest quality fresh products, harvested at peak, ensure
                      an exquisite culinary experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row g-4 align-items-center">
                  <div className="col-sm-4">
                    <img className="img-fluid rounded" src={img7} alt="" />
                  </div>
                  <div className="col-sm-8">
                    <h2 className="text-white mb-3">
                      We Deliver Fresh Mild Worldwide
                    </h2>
                    <p className="text-white mb-4">
                      Indulge in a global symphony of bakery delights, savoring
                      the world's finest confections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner End */}
        {/* Team Start */}
        <div className="container-xxl py-5">
          <div className="container d-flex flex-column align-items-center">
            <div className="text-center mx-autoUp" style={{ maxWidth: 500 }}>
              <h1 className="mb-5 text-light">Experienced Team</h1>
            </div>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6Up">
                <div className="team-item rounded p-4">
                  <img className="img-fluid rounded mb-4" src={img8} alt="" />
                  <h5>Adam Crew</h5>
                  <p>Founder</p>
                  <div className="d-flex justify-content-center">
                    <a
                      className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                      href=""
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                      href=""
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                      href=""
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6Up">
                <div className="team-item rounded p-4">
                  <img className="img-fluid rounded mb-4" src={img9} alt="" />
                  <h5>Doris Jordan</h5>
                  <p>Veterinarian</p>
                  <div className="d-flex justify-content-center">
                    <a
                      className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                      href=""
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                      href=""
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                      href=""
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6Up">
                <div className="team-item rounded p-4">
                  <img className="img-fluid rounded mb-4" src={img10} alt="" />
                  <h5>Jack Dawson</h5>
                  <p>Farmer</p>
                  <div className="d-flex justify-content-center">
                    <a
                      className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                      href=""
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                      href=""
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                      href=""
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Team End */}
      </div>
    </>
  );
}

export default About;
