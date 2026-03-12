import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../configs/api";


export default function Smarter() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/smarter`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${BASE_URL}/api/smarter/${id}`
    );
    fetchData();
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const truncate = (text, limit = 50) =>
    text.length > limit
      ? text.substring(0, limit) + "..."
      : text;

  return (
    <div className="mt-12 mb-8 px-6">
      <Card>

        <CardHeader
          variant="gradient"
          color="gray"
          className="flex justify-between p-6"
        >
          <Typography variant="h6" color="white">
            Smarter Section
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/cms/smarter/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border text-sm">

            <thead className="bg-blue-gray-50">
              <tr>
                <th className="border-blue-gray-200 border px-3 py-2">Heading</th>
                <th className="border-blue-gray-200 border px-3 py-2">Paragraph</th>
                <th className="border-blue-gray-200 border px-3 py-2">Media</th>
                <th className="border-blue-gray-200 border px-3 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="border-blue-gray-200 border px-3 py-2">
                    {truncate(stripHtml(item.heading))}
                  </td>

                  <td className="border-blue-gray-200 border px-3 py-2">
                    {truncate(stripHtml(item.para))}
                  </td>

                  <td className="border-blue-gray-200 border px-3 py-2 text-center">
                    {item.media_type === "image" ? (
                      <img
                        src={`${BASE_URL}/${item.media}`}
                        className="h-14 mx-auto"
                        alt=""
                      />
                    ) : (
                      <video
                        src={`${BASE_URL}/${item.media}`}
                        className="h-14 mx-auto"
                      />
                    )}
                  </td>

                  <td className="border-blue-gray-200 border px-3 py-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/dashboard/cms/smarter/edit/${item.id}`
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
