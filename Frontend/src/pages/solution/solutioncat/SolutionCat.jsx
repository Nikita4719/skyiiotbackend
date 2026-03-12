import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../../configs/api";


export default function SolutionCat() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/solution-cat`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${BASE_URL}/api/solution-cat/${id}`
    );
    fetchData();
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="flex justify-between items-center p-6"
        >
          <Typography variant="h6" color="white">
            Solution Category
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/solution/solution-cat/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border table-auto text-sm">
            <thead className="bg-blue-gray-50">
              <tr>
                <th className="border  border-blue-gray-200 px-3 py-2">Title</th>
                <th className="border  border-blue-gray-200 px-3 py-2">Image</th>
                <th className="border  border-blue-gray-200 px-3 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="border  border-blue-gray-200 px-3 py-2">
                    {item.title}
                  </td>

                  <td className="border  border-blue-gray-200 px-3 py-2 text-center">
                    {item.image && (
                      <img
                        src={`${BASE_URL}/${item.image}`}
                        className="h-14 w-14 object-cover rounded mx-auto"
                        alt=""
                      />
                    )}
                  </td>

                  <td className="border  border-blue-gray-200  px-3 py-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/dashboard/solution/solution-cat/edit/${item.id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        color="red"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
