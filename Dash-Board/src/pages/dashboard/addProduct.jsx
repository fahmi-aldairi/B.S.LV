import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Select, Option } from "@material-tailwind/react";
import Swal from "sweetalert2";

export function AddProduct() {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const notifySucess = () => {
    Swal.fire({
      title: "<strong>Product Is Add Successfully</strong>",
      position: "top",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const notifyfaild = () => {
    Swal.fire({
      title:
        "<strong>Please Check To Fill All Fields, Error to Add This product</strong>",
      position: "top",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const [partners, setPartners] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("");
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    product_count: "",
    product_Weight: "",
    product_price: "",
    discount: "",
    charge: "",
    sub_category: "",
  });
  const [images, setImages] = useState(null);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  // console.log(selectedCategory);

  const handlePartnerChange = (value) => {
    setSelectedPartner(value);
  };
  // console.log(selectedPartner);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (event) => {
    setImages(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/GetAllPartners",
          config
        );
        const result = response.data;
        setPartners(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFiles = new FormData();
      formDataWithFiles.append("partner_id", Number(selectedPartner));
      formDataWithFiles.append("category", selectedCategory);
      formDataWithFiles.append("product_name", formData.product_name);
      formDataWithFiles.append("sub_category", formData.sub_category);
      formDataWithFiles.append(
        "product_description",
        formData.product_description
      );
      formDataWithFiles.append("product_count", formData.product_count);
      formDataWithFiles.append("product_Weight", formData.product_Weight);
      formDataWithFiles.append("product_price", formData.product_price);
      formDataWithFiles.append("discount", formData.discount);
      formDataWithFiles.append("charge", formData.charge);
      formDataWithFiles.append("images", images);

      const response = await axios.post(
        "http://localhost:5000/AddNewProduct",
        formDataWithFiles,
        config
      );

      console.log("Data sent successfully");
      notifySucess();
    } catch (error) {
      console.log("Error:", error.message);
      notifyfaild();
    }
  };

  return (
    <>
      <div
        className="mx-auto mt-10 flex flex-col items-center rounded-xl p-10"
        style={{ backgroundColor: "#FFF2CC" }}
      >
        <div className="w-72">
          <form
            className="flex w-72 flex-col items-end gap-6"
            onSubmit={handleSubmit}
          >
            <Input
              className="bg-white"
              type="text"
              size="lg"
              label="Product Name"
              name="product_name"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
              type="text"
              size="lg"
              label="Product Description"
              name="product_description"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="product_Weight"
              size="lg"
              label="Product Weight"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="product_count"
              size="lg"
              label="Product Count"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="product_price"
              size="lg"
              label="Product Price"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="discount"
              size="lg"
              label="Product Discount"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="charge"
              size="lg"
              label="Charge"
              onChange={handleChange}
            />
            <Input
              type="file"
              accept="image/*"
              label="Upload Image"
              onChange={handleImagesChange}
            />
            <Select
              variant="outlined"
              label="Select Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <Option value="bread">Bread</Option>
              <Option value="cake">Cake</Option>
              <Option value="cookies">Cookies</Option>
            </Select>
            <Input
              type="text"
              name="sub_category"
              size="lg"
              label="Sub_category"
              onChange={handleChange}
            />
            <Select
              variant="outlined"
              label="Select Partner"
              value={selectedPartner}
              onChange={handlePartnerChange}
            >
              {partners.map((partner) => (
                <Option
                  key={partner.partner_id}
                  value={partner.partner_id.toString()}
                >
                  {partner.name}
                </Option>
              ))}
            </Select>
            <Button
              className="w-72"
              ripple={true}
              type="submit"
              style={{ backgroundColor: "black" }}
            >
              Add New Product
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
