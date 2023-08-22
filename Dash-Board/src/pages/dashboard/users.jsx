import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Users() {
  const [getAllData, setGetAllData] = useState([]);
  const [userCount, setUserCount] = useState(0);
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
      title: "<strong>User is deleted Successfully</strong>",
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

  const next = async () => {
    if (active === Math.ceil(userCount / 10)) return;

    setActive(active + 1);
    setOffset(offset + 10);

    try {
      const response = await axios.put("http://localhost:5000/usersPerPage", {
        offset: offset + 10,
      });
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
      const response = await axios.put("http://localhost:5000/usersPerPage", {
        offset: offset - 10,
      });
      console.log(response.data);
      const getAllData = response.data;
      setGetAllData(getAllData);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  // console.log(offset);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/users_count",
          config
        );
        const countOfUser = response.data;
        setUserCount(countOfUser);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put("http://localhost:5000/usersPerPage", {
          offset: offset,
        });
        console.log(response.data);
        const getAllData = response.data;
        setGetAllData(getAllData);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(getAllData);

  const handleDelete = async (user_id) => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      try {
        await axios.put(`http://localhost:5000/delete_user/${user_id}`);
        setGetAllData((prevData) =>
          prevData.filter((user) => user.user_id !== user_id)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            className="mb-8 p-6"
            style={{ backgroundColor: "#8B4403" }}
          >
            <div className="grid grid-cols-6 justify-end gap-x-8">
              <Typography variant="h6" color="white">
                Users Table
              </Typography>
            </div>
          </CardHeader>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID", "Name", "Email", "Role", "Action"].map((el) => (
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
                {getAllData.map(({ user_id, full_name, email, role }, key) => {
                  const className = `py-3 px-5 ${
                    key === 0 ? "" : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={user_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {user_id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {full_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {role}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="justify-center gap-2">
                          <div className="justify-center">
                            <IconButton
                              color="red"
                              onClick={() => handleDelete(user_id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </IconButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {Math.ceil(userCount / 10) > 1 && (
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
                      {Math.ceil(userCount / 10)}
                    </strong>
                  </Typography>
                  <IconButton
                    size="sm"
                    variant="outlined"
                    color="blue-gray"
                    onClick={next}
                    disabled={active === Math.ceil(userCount / 10)}
                  >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Users;
