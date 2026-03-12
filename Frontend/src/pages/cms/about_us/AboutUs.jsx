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

export default function AboutUs() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/about`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/about/${id}`);
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
            About Us
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/cms/about-us/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border border-blue-gray-200 table-auto">
            <thead className="bg-blue-gray-50">
              <tr>
                {["Title", "Heading", "Paragraph", "Image 1", "Image 2", "Action"].map((head) => (
                  <th
                    key={head}
                    className="border border-blue-gray-200 px-4 py-3 text-left text-xs font-bold uppercase text-blue-gray-600"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-gray-50">

                  {/* Title */}
                  <td className="border border-blue-gray-200 px-4 py-3 align-top max-w-xs">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.title,
                      }}
                    />
                  </td>

                  {/* Heading */}
                  <td className="border border-blue-gray-200 px-4 py-3 align-top max-w-xs">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.heading,
                      }}
                    />
                  </td>

                  {/* Paragraph (2 lines only) */}
                  <td className="border border-blue-gray-200 px-4 py-3 align-top max-w-sm">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.paragraph,
                      }}
                    />
                  </td>

                  {/* Image 1 */}
                  <td className="border border-blue-gray-200 px-4 py-3 text-center">
                    {item.image1 && (
                      <img
                        src={`${BASE_URL}/${item.image1}`}
                        className="h-14 w-14 object-cover rounded-lg mx-auto"
                        alt=""
                      />
                    )}
                  </td>

                  {/* Image 2 */}
                  <td className="border border-blue-gray-200 px-4 py-3 text-center">
                    {item.image2 && (
                      <img
                        src={`${BASE_URL}/${item.image2}`}
                        className="h-14 w-14 object-cover rounded-lg mx-auto"
                        alt=""
                      />
                    )}
                  </td>

                  {/* Actions */}
                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/dashboard/cms/about-us/edit/${item.id}`
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
