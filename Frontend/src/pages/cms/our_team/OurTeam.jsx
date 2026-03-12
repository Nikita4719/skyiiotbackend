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

export default function OurTeam() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/our-team`);
      setData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/our-team/${id}`);
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
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
            Our Team
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/cms/our-team/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border border-blue-gray-200 table-auto">
            <thead className="bg-blue-gray-50">
              <tr>
                {["Heading", "Paragraph", "Image", "Action"].map(
                  (head) => (
                    <th
                      key={head}
                      className="border border-blue-gray-200 px-4 py-3 text-left text-xs font-bold uppercase text-blue-gray-600"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-gray-50"
                  >
                    {/* Heading */}
                    <td className="border-blue-gray-200  border px-4 py-3 max-w-xs">
                      <div
                        className="line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: item.heading,
                        }}
                      />
                    </td>

                    {/* Paragraph */}
                    <td className="border-blue-gray-200  border px-4 py-3 max-w-sm">
                      <div
                        className="line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: item.paragraph,
                        }}
                      />
                    </td>

                    {/* Image */}
                    <td className="border-blue-gray-200  border px-4 py-3 text-center">
                      {item.image ? (
                        <img
                          src={`${BASE_URL}/${item.image}`}
                          alt="team"
                          className="h-14 w-14 object-cover rounded-lg mx-auto"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">
                          No Image
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="border-blue-gray-200  border px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outlined"
                          onClick={() =>
                            navigate(
                              `/dashboard/cms/our-team/edit/${item.id}`
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}