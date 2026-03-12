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


export default function SlidesContent() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/slides`);
      setData(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?"))
      return;

    await axios.delete(`${BASE_URL}/api/slides/${id}`);
    fetchData();
  };

  const renderMedia = (src) => {
    if (!src) return "No Media";

    const fullPath = `${BASE_URL}/${src}`;

    if (src.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video
          src={fullPath}
          width="120"
          height="80"
          style={{ objectFit: "cover" }}
          controls
          className="rounded"
        />
      );
    }

    return (
      <img
        src={fullPath}
        alt="media"
        width="120"
        height="80"
        className="rounded object-cover"
      />
    );
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="shadow-lg">
        <CardHeader
          variant="gradient"
          color="gray"
          className="flex items-center justify-between p-6"
        >
          <Typography variant="h6" color="white">
            Slides Content
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() => navigate("/dashboard/master/slides-content/add")}
          >
            Add Slide
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border table-fixed">
            <thead className="bg-blue-gray-50">
              <tr>
                <th className="border-blue-gray-200 border px-4 py-3 w-1/3">Title</th>
                <th className="border-blue-gray-200 border px-4 py-3 w-1/3">Media</th>
                <th className="border-blue-gray-200 border px-4 py-3 w-1/3">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="border-blue-gray-200 border px-4 py-3 truncate">
                      {item.title || "-"}
                    </td>

                    <td className="border-blue-gray-200 border px-4 py-3">
                      {renderMedia(item.media)}
                    </td>

                    <td className="border-blue-gray-200 border px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outlined"
                          onClick={() =>
                            navigate(
                              `/dashboard/master/slides-content/edit/${item.id}`
                            )
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          color="red"
                          onClick={() => handleDelete(item.id)}
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
                    colSpan="3"
                    className="text-center py-6 text-gray-500"
                  >
                    No Slides Found
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