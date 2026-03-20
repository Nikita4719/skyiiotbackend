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


export default function SolutionImage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/solution-images`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${BASE_URL}/api/solution-images/${id}`
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
            Solution Image
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/solution/solution-images/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody>
          <table className="w-full border table-auto text-sm">
            <thead className="bg-blue-gray-50">
              <tr>
                <th className="border-blue-gray-300  border px-3 py-2">Title</th>
                <th className="border-blue-gray-300  border px-3 py-2">Images</th>
                <th className="border-blue-gray-300  border px-3 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="border-blue-gray-300  border px-3 py-2">
                    {item.title}
                  </td>

                  <td className="border-blue-gray-200  border px-3 py-2">
                    <div className="flex gap-2">
                      {[item.image1, item.image2, item.image3, item.image4, item.imagechart]
                        .filter(Boolean)
                        .map((img, i) => (
                          <img
                            key={i}
                            src={`${BASE_URL}/${img}`}
                            className="h-14 w-14 object-cover rounded"
                            alt=""
                          />
                        ))}
                    </div>
                  </td>

                  <td className="border-blue-gray-200  border px-3 py-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/dashboard/solution/solution-images/edit/${item.id}`
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
