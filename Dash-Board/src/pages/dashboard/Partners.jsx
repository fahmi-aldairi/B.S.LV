import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export function Partners() {
  const [data, setdata] = useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const notifySucess = () => {
    Swal.fire({
      title: "<strong>Partner is deleted Successfully</strong>",
      position: "top",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to delete this user?",
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

  ///////////////////////////////////////////////////

  const handleDelete = async (partner_id) => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      try {
        await axios.put(
          `http://localhost:5000/delete_partner/${partner_id}`,
          null,
          config
        );
        setdata((prevData) =>
          prevData.filter((partner) => partner.partner_id !== partner_id)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  ///////////////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/GetAllPartners",
          config
        );
        const result = response.data;
        setdata(result);
        // console.log(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  ///////////////////////////////////////////////////

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
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

      const response = await axios.post(
        `http://localhost:5000/update_partner/${updateId}`,
        formDataWithFiles,
        config
      );
      console.log(response);
      console.log("Data sent successfully");
      setShowMessg(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/GetAllPartners",
          config
        );
        const result = response.data;
        setdata(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    } catch (error) {
      console.log("Error:", error.message);
      setShowMessg(false);
    }
  };
  // console.log(updateId);
  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 ">
        <Card>
          <CardHeader
            className="mb-8 p-6"
            style={{ backgroundColor: "#8B4403" }}
          >
            <div className="flex flex-row justify-between gap-x-8">
              <Typography variant="h6" color="white">
                Partners Table
              </Typography>
              <button className="h-10 w-40 rounded-lg bg-black text-sm font-bold text-white shadow-lg hover:bg-gray-700">
                <Link to="/dashboard/partner/add">Add New Partner</Link>
              </button>
            </div>
          </CardHeader>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["partner_id", "name", "phone", "email", "Action"].map(
                    (el) => (
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
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map(({ partner_id, name, phone, email }, key) => {
                  return (
                    <tr key={partner_id}>
                      <td className="border-b border-blue-gray-50 py-3 px-5">
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {partner_id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-5">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {name}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-5">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-5">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>

                      <td className="border-b border-blue-gray-50 py-3 px-5">
                        <div className="justify-center">
                          <IconButton
                            color="red"
                            onClick={() => {
                              handleDelete(partner_id);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </IconButton>
                        </div>
                        <div className="my-3 justify-center">
                          <IconButton
                            color="blue"
                            onClick={() => {
                              handleOpen(partner_id);
                              setUpdateId(partner_id);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </IconButton>
                        </div>
                        <div className="justify-center">
                          <Typography className="justify-center text-xs font-semibold text-blue-gray-600">
                            <Link
                              to={`/dashboard/partner/details/${partner_id}`}
                            >
                              <IconButton ripple={true} color="green">
                                {/* <i className="fa-regular fa-pen-to-square"></i> */}
                                <i className="fa-solid fa-info"></i>
                              </IconButton>
                            </Link>
                          </Typography>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
      >
        <DialogHeader>Update Partner Data</DialogHeader>
        <DialogBody divider>
          <form
            className="flex flex-col items-end gap-6"
            onSubmit={handleUpdate}
          >
            <Input
              className="bg-white"
              type="text"
              size="lg"
              label="Partner Name"
              name="name"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
              type="text"
              name="phone"
              size="lg"
              label="Phone"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
              type="text"
              name="email"
              size="lg"
              label="Email"
              onChange={handleChange}
            />
            <Input
              className="bg-white"
              type="file"
              accept="image/*"
              label="Upload Image"
              onChange={handleImagesChange}
            />

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

export default Partners;
