import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductDetials() {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [data, setdata] = useState([]);
  // let params = useParams();
  let { id } = useParams();
  console.log(">>>>", id);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(token);
      try {
        const response = await axios.get(
          `http://localhost:5000/product/${id}`,
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

  console.log(data);

  return (
    <div className="mx-auto flex flex-col items-center rounded-xl p-20">
      {data.map((data) => (
        <Card
          className="w-full max-w-[48rem] flex-row"
          style={{ backgroundColor: "#FFF2CC" }}
        >
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
          >
            <img
              src={`http://localhost:5000/images/${data.image}`}
              alt="image"
              className="object-fit h-full w-full"
            />
          </CardHeader>
          <CardBody>
            <Typography
              variant="h4"
              className="mb-4 uppercase"
              style={{ color: "#000000" }}
            >
              {data.product_name}
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              {data.product_description}
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 flex flex-row capitalize"
            >
              Category
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-2 text-gray-700"
              >
                {` : ${data.category}`}
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 flex flex-row capitalize"
            >
              Weight
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-2 text-gray-700"
              >
                {` : ${data.product_weight} Kg`}
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 flex flex-row capitalize"
            >
              Price
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-2 text-gray-700"
              >
                {` : ${data.product_price} Jd`}
              </Typography>
            </Typography>
            {data.product_count < 5 && data.product_count > 0 ? (
              <>
                {" "}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2 flex flex-row capitalize"
                >
                  Count
                  <Typography
                    variant="h6"
                    color="red"
                    className="mb-2 text-red-500"
                  >
                    {` : ${data.product_count} Items`}
                  </Typography>
                </Typography>
              </>
            ) : (
              <>
                {" "}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2 flex flex-row capitalize"
                >
                  Count
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 text-gray-700"
                  >
                    {` : ${data.product_count} items`}
                  </Typography>
                </Typography>
              </>
            )}

            <Link to={`/dashboard/products`} className="inline-block">
              <Button
                className="flex items-center gap-2"
                style={{ color: "white", backgroundColor: "black" }}
              >
                Products Table
                <ArrowLongRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
