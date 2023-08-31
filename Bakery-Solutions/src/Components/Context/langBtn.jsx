/* eslint-disable react/prop-types */
import { useEffect, useState, createContext, useContext } from "react";
import { Dropdown } from "react-bootstrap";
const LanguageContext = createContext();

const LangProvider = ({ children }) => {
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
  return (
    <LanguageContext.Provider value={{ showButton }}>
      {children}
    </LanguageContext.Provider>
  );
};

const LangBtn = () => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    window.location.href = selectedValue;
  };
  const { showButton } = useContext(LanguageContext);
  return (
    showButton && (
      <div
        style={{
          position: "fixed",
          bottom: "5px",
          left: "0.5%",
          zIndex: "500",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle
            variant="#fff2cc"
            id="language-dropdown"
            style={{ backgroundColor: "#fff2cc", color: "#8B4403" }}
          >
            Select Language
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ backgroundColor: "#fff2cc", color: "#8B4403" }}
          >
            <Dropdown.Item
              href="/#"
              onSelect={handleChange}
              data-content='<span class="flag-icon flag-icon-de"></span> Deutsch'
            >
              Arabic
            </Dropdown.Item>
            <Dropdown.Item
              href="/#"
              onSelect={handleChange}
              data-content='<span class="flag-icon flag-icon-gb"></span> English'
            >
              English (default)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  );
};

export { LangBtn, LangProvider, LanguageContext };
