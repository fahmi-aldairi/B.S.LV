import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function AddPartner() {
  const [success, setSuccess] = useState();
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

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [images, setImages] = useState();
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImagesChange = (event) => {
    setImages(event.target.files[0]);
  };

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to Add this partner?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add it!",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = await showConfirmationPrompt();

    let formIsValid = true;
    const updatedErrors = { ...errors };

    if (!formData.name) {
      updatedErrors.name = "Please enter a Partner Name.";
      formIsValid = false;
    }

    if (!formData.phone) {
      updatedErrors.phone = "Please enter a Phone Number.";
      formIsValid = false;
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        updatedErrors.phone = "Please enter a valid 10-digit phone number.";
        formIsValid = false;
      }
    }

    if (!formData.email) {
      updatedErrors.email = "Please enter an Email.";
      formIsValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        updatedErrors.email = "Please enter a valid email address.";
        formIsValid = false;
      }
    }

    if (!formIsValid) {
      setErrors(updatedErrors);
      return;
    } else if (confirmed) {
      try {
        const formDataWithFiles = new FormData();
        formDataWithFiles.append("name", formData.name);
        formDataWithFiles.append("phone", formData.phone);
        formDataWithFiles.append("email", formData.email);
        formDataWithFiles.append("images", images);

        const response = await axios.post(
          "http://localhost:5000/AddNewPartner",
          formDataWithFiles,
          config
        );
        console.log("Data sent successfully");
        setSuccess(true);
      } catch (error) {
        console.error(error);
        setSuccess(false);
        notifyfaild();
      }
    }
  };

  return (
    <>
      <div
        className="mx-auto mt-10 flex flex-col items-center rounded-xl p-20"
        style={{ backgroundColor: "#FFF2CC" }}
      >
        <div className="w-72">
          <div className="mb-8 w-full"> </div>
          <form
            className="flex w-72 flex-col items-end gap-6"
            onSubmit={handleSubmit}
          >
            <Input
              className="bg-white"
              type="text"
              size="lg"
              label="Partner Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="phone"
              size="lg"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="email"
              size="lg"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="file"
              accept="image/*"
              label="Upload Image"
              onChange={handleImagesChange}
            />
            <div className="w-full">
              <>
                {success && (
                  <p className="text-green-500">Partner added successfully!</p>
                )}
                {success === false && (
                  <p className="text-red-500">Partner already exist!</p>
                )}
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </>
            </div>

            <Button
              className="w-72"
              ripple={true}
              type="submit"
              style={{ backgroundColor: "black" }}
            >
              Add New Partner
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPartner;
