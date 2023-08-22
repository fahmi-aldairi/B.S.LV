/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";
import { HashLink } from "react-router-hash-link";
const BackToTopContext = createContext();

const BackToTopProvider = ({ children }) => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const isTop = window.scrollY === 0;
    setShowButton(!isTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BackToTopContext.Provider value={{ showButton, handleClick }}>
      {children}
    </BackToTopContext.Provider>
  );
};
const BackToTopButton = () => {
  const { showButton, handleClick } = useContext(BackToTopContext);

  return (
    showButton && (
      <HashLink
        to="#"
        className="btn btn-lg btn-lg-square rounded-circle back-top"
        style={{ backgroundColor: "#FFF2CC" }}
        onClick={handleClick}
      >
        <i className="fa-solid fa-arrow-up" style={{ color: "#8b4403" }} />
      </HashLink>
    )
  );
};

export { BackToTopContext, BackToTopProvider, BackToTopButton };
