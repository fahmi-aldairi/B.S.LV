import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

////////////////////////////////////////////
export function Product() {
  const [getAllData, setGetAllData] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState(1);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const notifySucess = () => {
    Swal.fire({
      title: "<strong>Product is deleted Successfully</strong>",
      position: "top",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const notifySucessStock = () => {
    Swal.fire({
      title: "<strong>Product Updated Successfuly</strong>",
      position: "top",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to delete this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
          notifySucess();
        } else {
          resolve(false);
        }
      });
    });
  };

  ////////////////////////////////////////////

  const next = async () => {
    if (active === Math.ceil(productCount / 10)) return;

    setActive(active + 1);
    setOffset(offset + 10);

    try {
      const response = await axios.put(
        "http://localhost:5000/getProductPerPage",
        {
          offset: offset + 10,
        }
      );
      console.log(response.data);
      const getAllData = response.data;
      setGetAllData(getAllData);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const prev = async () => {
    if (active === 1) return;

    setActive(active - 1);
    setOffset(offset - 10);

    try {
      const response = await axios.put(
        "http://localhost:5000/getProductPerPage",
        {
          offset: offset - 10,
        }
      );
      console.log(response.data);
      const getAllData = response.data;
      setGetAllData(getAllData);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  // console.log(offset);

  ////////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/ProductsCount",
          config
        );
        const countOfProducts = response.data;
        setProductCount(countOfProducts);
        // console.log(countOfProducts);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  ////////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(
          "http://localhost:5000/getProductPerPage",
          {
            offset: offset,
          }
        );
        // console.log(response.data);
        const getAllData = response.data;
        setGetAllData(getAllData);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(getAllData);

  ////////////////////////////////////////////

  const handleDelete = async (product_id) => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      try {
        await axios.put(
          `http://localhost:5000/delete_Product/${product_id}`,
          null,
          config
        );
        setGetAllData((prevData) =>
          prevData.filter((product) => product.product_id !== product_id)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  ////////////////////////////////////////////

  const [stockData, setStockData] = useState({
    product_count: "",
    product_id: "",
  });
  const [massageWarning, setMassageWarning] = useState({
    product_count: "",
  });

  const [idStock, setIdStock] = useState();

  const handlestockIcon = (product_id) => {
    setIdStock(product_id);
  };
  // console.log(idStock);

  const handleprodCount = (event) => {
    const pattern = /^\d+$/;
    const product_count = event.target.value;

    if (product_count === "") {
      setMassageWarning({ ...massageWarning, product_count: "" });
      setStockData("");
    } else if (!pattern.test(product_count)) {
      setMassageWarning({
        ...massageWarning,
        product_count: "please insert number",
      });
      setStockData("");
    } else {
      setMassageWarning({ ...massageWarning, product_count: "" });
      setStockData((prev) => ({
        ...prev,
        product_count: parseInt(product_count),
        product_id: parseInt(idStock),
      }));
    }
  };

  const handleupdateStock = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/Update_Stock`, stockData, config);
      console.log("data Sended");
      notifySucessStock();
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.put(
        "http://localhost:5000/getProductPerPage",
        {
          offset: offset,
        }
      );
      // console.log(response.data);
      const getAllData = response.data;
      setGetAllData(getAllData);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  // console.log(stockData);

  ////////////////////////////////////////////

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    product_count: "",
    product_Weight: "",
    product_price: "",
    charge: "",
    sub_category: "",
  });
  const [images, setImages] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (event) => {
    setImages(event.target.files[0]);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  // console.log(selectedCategory);

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

  const handlePartnerChange = (value) => {
    setSelectedPartner(value);
  };
  console.log(selectedPartner);

  const [updateId, setUpdateId] = useState();
  const [showMessg, setShowMessg] = useState();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFiles = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "") {
          formDataWithFiles.append(key, value);
          // console.log(...formDataWithFiles);
        }
      });
      if (images) {
        formDataWithFiles.append("images", images);
      }
      if (selectedCategory !== "") {
        formDataWithFiles.append("category", selectedCategory);
      }
      if (selectedPartner !== "") {
        formDataWithFiles.append("partner_id", Number(selectedPartner));
      }

      const response = await axios.post(
        `http://localhost:5000/Update_Product/${updateId}`,
        formDataWithFiles,
        config
      );
      console.log(response);
      console.log("Data sent successfully");
      setShowMessg(true);
    } catch (error) {
      console.log("Error:", error.message);
      setShowMessg(false);
    }
    try {
      const response = await axios.put(
        "http://localhost:5000/getProductPerPage",
        {
          offset: offset,
        }
      );
      // console.log(response.data);
      const getAllData = response.data;
      setGetAllData(getAllData);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  console.log(updateId);
  console.log(getAllData);

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            className="mb-8 p-6"
            style={{ backgroundColor: "#8B4403" }}
          >
            <div className="flex flex-row justify-between gap-x-8">
              <Typography variant="h6" color="white">
                All Products
              </Typography>
              <button className="h-10 w-40 rounded-lg bg-black text-sm font-bold text-white shadow-lg hover:bg-gray-700">
                <Link to="/dashboard/product/add">Add New Product</Link>
              </button>
            </div>
          </CardHeader>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "ID",
                    "partner_Id",
                    "product_name",
                    "category",
                    "sub_category",
                    "product_weight",
                    "product_price",
                    "discount",
                    "product_count",
                    "ٍStatus",
                    "Action",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="jus">
                {getAllData.map(
                  (
                    {
                      product_id,
                      partner_id,
                      product_name,
                      category,
                      sub_category,
                      product_weight,
                      product_price,
                      discount,
                      product_count,
                      out_of_stock,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key === 0 ? "" : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={product_id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {product_id}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {partner_id}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {product_name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {category}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {sub_category}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {product_weight} Kg
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {product_price} Jd
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {discount === null || discount === "" ? (
                              <></>
                            ) : (
                              <>{discount} Jd</>
                            )}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {product_count} items
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {out_of_stock ? (
                              <>
                                <div className="flex flex-col justify-center">
                                  <p className="mb-2 text-red-500">
                                    Out-Of-Stock
                                  </p>
                                  <Popover>
                                    <PopoverHandler
                                      onClick={() =>
                                        handlestockIcon(product_id)
                                      }
                                    >
                                      <IconButton
                                        color="yellow"
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      >
                                        <i class="fa-solid fa-info"></i>
                                      </IconButton>
                                    </PopoverHandler>
                                    <PopoverContent>
                                      <form
                                        className="flex flex-col items-end gap-6"
                                        // id={product_id}
                                        onSubmit={handleupdateStock}
                                      >
                                        {/* {setStockData( )} */}
                                        <Input
                                          id="product_count"
                                          type="text"
                                          name="product_count"
                                          size="lg"
                                          label="Product Count"
                                          onBlur={handleprodCount}
                                        />
                                        <div className="w-full">
                                          <p className="mt-2 text-sm text-red-600">
                                            {massageWarning.product_count}
                                          </p>
                                        </div>
                                        <Button
                                          className="w-72"
                                          ripple={true}
                                          type="submit"
                                          style={{ backgroundColor: "black" }}
                                        >
                                          Add New Product
                                        </Button>
                                      </form>
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </>
                            ) : (
                              <p className="text-green-500">available</p>
                            )}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="col-auto justify-center">
                            <div className="justify-center">
                              <IconButton
                                color="red"
                                onClick={() => handleDelete(product_id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </IconButton>
                            </div>
                            <div className="my-3 justify-center">
                              <IconButton
                                color="blue"
                                onClick={() => {
                                  handleOpen(product_id);
                                  setUpdateId(product_id);
                                }}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </IconButton>
                            </div>
                            <div className="justify-center">
                              <Typography className="justify-center text-xs font-semibold text-blue-gray-600">
                                <Link
                                  to={`/dashboard/product/details/${product_id}`}
                                >
                                  <IconButton ripple={true} color="green">
                                    {/* <i className="fa-regular fa-pen-to-square"></i> */}
                                    <i class="fa-solid fa-info"></i>
                                  </IconButton>
                                </Link>
                              </Typography>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {Math.ceil(productCount / 10) > 1 && (
              <div className="my-10 flex justify-center">
                <div className="flex items-center gap-8">
                  <IconButton
                    size="sm"
                    variant="outlined"
                    color="blue-gray"
                    onClick={prev}
                    disabled={active === 1}
                  >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                  </IconButton>
                  <Typography color="gray" className="font-normal">
                    Page{" "}
                    <strong className="text-blue-gray-900">{active}</strong> of{" "}
                    <strong className="text-blue-gray-900">
                      {Math.ceil(productCount / 10)}
                    </strong>
                  </Typography>
                  <IconButton
                    size="sm"
                    variant="outlined"
                    color="blue-gray"
                    onClick={next}
                    disabled={active === Math.ceil(productCount / 10)}
                  >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="h-1/2 overflow-y-scroll"
      >
        <DialogHeader>Update Product Data</DialogHeader>
        <DialogBody divider>
          <form
            className="flex flex-col items-end gap-6 "
            onSubmit={handleUpdate}
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
              name="product_description"
              size="lg"
              label="Product Description"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
              type="text"
              name="product_weight"
              size="lg"
              label="Product Weight"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
              type="text"
              name="product_count"
              size="lg"
              label="Product Count"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
              type="text"
              name="product_price"
              size="lg"
              label="Product Price"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
              type="text"
              name="discount"
              size="lg"
              label="Product Discount"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
              type="text"
              name="charge"
              size="lg"
              label="Charge"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
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
              <Option value="all purpose">All Purpose</Option>
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
            <div className="flex w-full justify-center">
              {showMessg === true && (
                <p className="text-green-500">Partner is Update Successfully</p>
              )}
              {showMessg === false && (
                <p className="text-red-500">
                  Error in Updating Partner check your datas
                </p>
              )}
            </div>
            <div>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" type="submit">
                <span>Confirm</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default Product;
