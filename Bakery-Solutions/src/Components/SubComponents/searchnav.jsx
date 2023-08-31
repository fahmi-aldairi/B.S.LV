import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function SearchField() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchFieldRef = useRef(null);
  const navigate = useNavigate("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllProducts"
        );
        const result = response.data;
        setData(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const searchTerm = value.toLowerCase();
      const filtered = data.filter((item) =>
        item.product_name.toLowerCase().startsWith(searchTerm)
      );
      setFilteredData(filtered);
    };

    filterData();
  }, [data, value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchFieldRef.current &&
        !searchFieldRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    setValue(event.target.value);
    setShowDropdown(true);
  };

  const handleBtn = (searchedItem) => {
    // console.log("Searched Item:", searchedItem);
    setShowDropdown(false);
    const selectedItem = data.find(
      (item) => item.product_name === searchedItem
    );
    // console.log(selectedItem.product_id);
    if (selectedItem) {
      navigate(`/prodDetails/${selectedItem.product_id}`);
    }
  };

  return (
    <>
      <div className="input-group d-flex flex-column" ref={searchFieldRef}>
        <div className="d-flex">
          <input
            className="SearchBox form-control border-end-0 border m-0 rounded-0"
            type="text"
            placeholder="Search"
            id="example-search-input"
            value={value}
            onChange={handleSearch}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          />
          <span className="input-group-append">
            <button
              className="Searchicon rounded-0 btn border-start-0 border-bottom-0 border ms-n5"
              type="button"
              onClick={() => {
                handleBtn(value);
              }}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "1px solid #007bff",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              <i className="fa fa-search" />
            </button>
          </span>
        </div>
        <div>
          {showDropdown && (
            <ul
              className="dropdown-menu show w-100 rounded-0"
              style={{ backgroundColor: "#8d8977", color: "#8B4403" }}
            >
              {filteredData.map((item) => (
                <li key={item.id}>
                  <a
                    className="dropdown-item drItem"
                    href=""
                    style={{ color: "#FFF2CC", fontSize: "10px" }}
                    onClick={() => {
                      handleBtn(item.product_name);
                    }}
                  >
                    {item.product_name.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchField;
