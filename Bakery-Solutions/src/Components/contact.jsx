/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import { styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
import "../Style/contact.css";

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

function Contact() {
  return (
    <>
      <div className="container-fluid page-header py-6 d-flex flex-column-reverse justify-content-center ">
        <div className="container text-center py-5">
          <h1 className="display-4 mb-3" style={{ color: "#FFD966" }}>
            Contact Us
          </h1>
          <div className="d-flex justify-content-center">
            <Breadcrumbs aria-label="breadcrumb" separator={<WhiteSeparator />}>
              <StyledBreadcrumb
                component="a"
                href="/"
                label="Home"
                icon={<HomeIcon fontSize="small" color="#8B4403" />}
              />
              <StyledBreadcrumb
                component="a"
                label="Contact-Us"
                icon={<CallIcon fontSize="small" color="#8B4403" />}
              />
            </Breadcrumbs>
          </div>
        </div>
      </div>
      {/* /// */}
      <div className="container-xxl lgFormCon py-6 mb-5 rounded-4">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: 800 }}>
            <p className="title text-uppercase mt-5 mb-2 display-6 fw-bold">
              // Contact Us
            </p>
            <h1 className="display-6 my-4 text-light">
              If You Have Any Query, Please Contact Us
            </h1>
          </div>
          <div className="row g-0 justify-content-center">
            <div className="col-lg-8">
              <p className="text-center mb-4 text-light">
                The contact form is currently inactive. Get a functional and
                working contact form with Ajax &amp; PHP in a few minutes. Just
                copy and paste the files, add a little code and you're done{" "}
              </p>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control FC"
                        id="name"
                        placeholder="Name"
                      />
                      <label className="LFC" htmlFor="name">
                        Name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control FC"
                        id="email"
                        placeholder="Email"
                      />
                      <label className="LFC" htmlFor="email">
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control FC"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label className="LFC" htmlFor="subject">
                        Subject
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control FC"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: 200 }}
                        defaultValue={""}
                      />
                      <label className="LFC" htmlFor="message">
                        Message
                      </label>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button
                      className="btn btn-primary rounded-pill py-3 px-5"
                      type="submit"
                      style={{
                        backgroundColor: "#8B4403",
                        border: 0,
                        boxShadow: "0 2px 10px #8B4403",
                        transition: "transform 0.3s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
