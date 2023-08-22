import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [massageWarning, setMassageWarning] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (event) => {
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
    const email = event.target.value;

    if (email === "") {
      setMassageWarning({ ...massageWarning, email: "Required!" });
    } else if (!patternEmail.test(email)) {
      setMassageWarning({ ...massageWarning, email: "Invalid email" });
    } else {
      setMassageWarning({ ...massageWarning, email: "" });
      setUser({ ...user, email: email.toLowerCase() });
    }
  };

  const handlePassword = (event) => {
    const patternPassword =
      /^(?=.*[A-Z]?)(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
    const password = event.target.value;

    if (password === "") {
      setMassageWarning({ ...massageWarning, password: "Required!" });
    } else if (!patternPassword.test(password)) {
      setMassageWarning({
        ...massageWarning,
        password:
          "Invalid password, Password must consist of 8 characters, with at least 1 number, uppercase, and special characters",
      });
    } else {
      setMassageWarning({ ...massageWarning, password: "" });
      setUser({ ...user, password: password });
    }
  };

  const notifySucess = () => {
    Swal.fire({
      title: "<strong>Welcome to Bakery Solution</strong>",
      position: "top",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const notifyfaild = () => {
    Swal.fire({
      title: "<strong>Admin isn't exist</strong>",
      position: "top",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const HandleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/loginAdmin",
        user
      );
      localStorage.setItem("token", response.data.token);
      console.log("data Send Successfuly");
      navigate("/dashboard/home");
      notifySucess();
    } catch (error) {
      console.log(error);
      notifyfaild();
    }
    console.log(user);
  };

  return (
    <>
      <img
        src="https://cdn.discordapp.com/attachments/1106603168823005294/1121492635375378462/body-bg.png"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-9">
        <Card
          className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4"
          style={{ background: "#dad1b3" }}
        >
          <CardHeader
            style={{ backgroundColor: "#8B4403" }}
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody>
            <form onSubmit={HandleSignIn} className="flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                size="lg"
                onBlur={handleEmail}
              />
              <p className="ml-5 text-xs text-red-500">
                <span className="font-weight-medium">
                  {massageWarning.email}
                </span>
              </p>
              <Input
                type="password"
                label="Password"
                size="lg"
                onBlur={handlePassword}
              />
              <p className="ml-5 text-xs text-red-500">
                <span className="font-weight-medium">
                  {massageWarning.password}
                </span>
              </p>
              <Button
                fullWidth
                style={{ backgroundColor: "#8B4403" }}
                type="submit"
              >
                Sign In
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
