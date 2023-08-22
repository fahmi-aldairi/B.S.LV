import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PartnerDetails() {
  const token = localStorage.getItem("token");
  const [data, setdata] = useState([]);
  // let params = useParams();
  let { id } = useParams();
  console.log(">>>>", id);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log(token);
      try {
        const response = await axios.get(
          `http://localhost:5000/partner/${id}`,
          config
        );
        const result = response.data;
        setdata(result);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <div className="mx-auto flex flex-col items-center rounded-xl p-20">
      {data.map((data) => (
        <Card className="mt-6 w-96" style={{ backgroundColor: "#FFF2CC" }}>
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={`http://localhost:5000/images/${data.image}`}
              alt="img-blur-shadow"
              layout="fill"
            />
          </CardHeader>
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 flex flex-row capitalize"
            >
              partner name
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-gray-700"
              >
                {` : ${data.name}`}
              </Typography>
            </Typography>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 flex flex-row capitalize"
            >
              email :
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-gray-700"
              >
                {data.email}
              </Typography>
            </Typography>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 flex flex-row capitalize"
            >
              Phone :
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-gray-700"
              >
                {data.phone}
              </Typography>
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link to={`/dashboard/Partners`}>
              <Button
                className="flex items-center gap-2"
                style={{ color: "white", backgroundColor: "black" }}
              >
                partner Table
                <ArrowLongRightIcon className="h-5 w-5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
