import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../configs/api";
import { useNavigate } from "react-router-dom";

export default function ServicesCategory() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/services-category`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/services-category/${id}`);
    fetchData();
  };

  return (

    <div className="mt-12 px-6">

      <Card>

        <CardHeader
          variant="gradient"
          color="gray"
          className="flex justify-between items-center p-6"
        >
          <Typography variant="h6">
            Services Category
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/master/services-category/add")
            }
          >
            Add
          </Button>

        </CardHeader>

        <CardBody>

          <table className="w-full border">

            <thead className="bg-blue-gray-50">
              <tr>
                <th className="border border-blue-gray-200 p-3">Service</th>
                <th className="border border-blue-gray-200 p-3">Icon</th>
                <th className="border border-blue-gray-200 p-3">Link</th>
                <th className="border border-blue-gray-200 p-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {data.map(item => (

                <tr key={item.id}>

                  {/* ✅ HTML render */}
                  <td
                    className="border border-blue-gray-200 p-3"
                    dangerouslySetInnerHTML={{
                      __html: item.service?.title || ""
                    }}
                  />

                  <td className="border border-blue-gray-200 p-3">
                    {item.icon && (
                      <img
                        src={`${BASE_URL}/${item.icon}`}
                        className="h-12"
                        alt=""
                      />
                    )}
                  </td>

                  {/* ✅ HTML render */}
                  <td
                    className="border border-blue-gray-200 p-3"
                    dangerouslySetInnerHTML={{
                      __html: item.link || ""
                    }}
                  />

                  <td className="border border-blue-gray-200 px-4 py-3">

                    <div className="flex gap-2">

                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/dashboard/master/services-category/edit/${item.id}`)
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