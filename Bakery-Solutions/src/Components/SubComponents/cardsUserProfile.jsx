import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

function CardsUserProfile() {
  const [data, setData] = useState([]);
  const [userid, setuserId] = useState();
  // console.log("iddddddddddd", userid);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage?.getItem("token");
      let id;
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          id = decodedToken.user_id;
          setuserId(id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    fetchData();
  }, []);
  console.log(userid);

  useEffect(() => {
    const fetchData = async () => {
      let id = 54;
      try {
        const response = await axios.get(
          `http://localhost:5000/getUserProducts/${id}`
        );
        const result = response.data;
        setData(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <div>
      {" "}
      <div className="text-center prdHdCon mx-auto my-5">
        <h6 className="text-uppercase mb-2"></h6>
        <h1 className="display-6 mb-4">Your Previous Orders</h1>
      </div>
      <div className="row g-4 mainPro w-100 p-0 justify-content-center">
        {data.map((item) => (
          <>
            <div className="col-lg-4 col-md-6" key={item.product_id}>
              <div
                className="product-item d-flex flex-column rounded-4 overflow-hidden h-100"
                // style={cakeStyle}
              >
                <div className="text-center p-4">
                  <h3 className="mb-3">{item.product_name}</h3>
                  <span>{item.product_description.substring(0, 110)}</span>
                </div>
                <div className="position-relative mt-auto">
                  <img
                    className="img-fluid"
                    src={`http://localhost:5000/images/${item.image}`}
                    alt=""
                  />
                  <div className="product-overlay">
                    <Link
                      className="btn eyeBtn btn-lg-square btn-outline-light rounded-circle"
                      to={`/prodDetails/${item.product_id}`}
                    >
                      <i className="fa fa-eye" style={{ color: "#8b4403" }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default CardsUserProfile;
