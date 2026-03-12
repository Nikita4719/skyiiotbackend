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

export default function AIPowered() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [preview, setPreview] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/ai-powered`);
    setData(res.data);
    if (res.data.media) {
      const fileUrl = `${BASE_URL}/${res.data.media}`;
      setPreview(fileUrl);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/ai-powered/${id}`);
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
            AI Powered
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/cms/ai-powered/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border border-blue-gray-200 table-auto">
            <thead className="bg-blue-gray-50">
              <tr>
                {[
                  "Heading1",
                  "Heading2",
                  "Heading3",
                  "Paragraph1",
                  "Paragraph2",
                  "Media",
                  "Action",
                ].map((head) => (
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

                  <td className="border-blue-gray-200 border px-4 py-3 max-w-xs">
                    <div className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.heading1 }} />
                  </td>

                  <td className="border-blue-gray-200 border px-4 py-3 max-w-xs">
                    <div className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.heading2 }} />
                  </td>

                  <td className="border-blue-gray-200 border px-4 py-3 max-w-xs">
                    <div className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.heading3 }} />
                  </td>

                  <td className="border-blue-gray-200 border px-4 py-3 max-w-sm">
                    <div className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.paragraph1 }} />
                  </td>

                  <td className="border-blue-gray-200 border px-4 py-3 max-w-sm">
                    <div className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.paragraph2 }} />
                  </td>

                  <td className="border border-blue-gray-200 px-4 py-3 text-center">
                    {item.media && (
                      item.media.endsWith(".mp4") ||
                        item.media.endsWith(".mov") ||
                        item.media.endsWith(".avi") ||
                        item.media.endsWith(".webm") ? (



                        <video
                          src={`${BASE_URL}/${item.media}`}
                          className="h-14 w-14 object-cover rounded-lg mx-auto cursor-pointer"
                          muted
                          autoPlay
                          loop
                          playsInline
                          onClick={() =>
                            setSelectedVideo(`${BASE_URL}/${item.media}`)
                          }
                        />
                      ) : (
                        <img
                          src={`${BASE_URL}/${item.media}`}
                          className="h-14 w-14 object-cover rounded-lg mx-auto"
                          alt=""
                        />
                      )
                    )}
                  </td>
                  {selectedVideo && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                      <div className="relative bg-white p-4 rounded-xl w-[90%] md:w-[700px]">

                        {/* Close Button */}
                        <button
                          className="absolute top-2 right-3 text-xl font-bold"
                          onClick={() => setSelectedVideo(null)}
                        >
                          ✕
                        </button>

                        <video
                          src={selectedVideo}
                          controls
                          autoPlay
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>
                  )}



                  <td className="border-blue-gray-200 border px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/dashboard/cms/ai-powered/edit/${item.id}`
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
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
