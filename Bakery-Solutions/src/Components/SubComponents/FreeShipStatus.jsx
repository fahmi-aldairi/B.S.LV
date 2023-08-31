/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function FreeShipStatus(props) {
  const [roundedPrice, setRoundedprice] = useState(0);

  useEffect(() => {
    setRoundedprice(Math.ceil(props.tillFreeShip / 10) * 10);
  }, [props]);

  console.log(roundedPrice);
  const progressBarStyles = {
    width: `${100 - roundedPrice}%`,
    height: "2rem",
    backgroundColor: "#8b4403",
    borderRadius: 10,
    boxShadow: "inset 0 0 10px #efefef",
    transition: "width 0.5s ease-in", // Add transition property
  };
  return (
    <div
      className="d-flex flex-row justify-content-start"
      style={{
        width: `calc(100% - 200px)`,
        height: "2rem",
        backgroundColor: "#efefef",
        borderRadius: 10,
        boxShadow: "0 0 10px #8b4403",
      }}
    >
      <div className="position-relative" style={progressBarStyles} />
    </div>
  );
}

export default FreeShipStatus;
