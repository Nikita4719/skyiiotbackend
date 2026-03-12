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

export default function Faq() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/cms-faqs`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/cms-faqs/${id}`);
    fetchData();
  };


  const truncateText = (html, limit = 120) => {
    if (!html) return "";


    const plainText = html.replace(/<[^>]+>/g, "");


    if (plainText.length > limit) {
      return plainText.substring(0, limit) + "...";
    }

    return plainText;
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="flex items-center justify-between p-6"
        >
          <Typography variant="h6" color="white">
            FAQ (CMS)
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() => navigate("/dashboard/cms/faq/add")}
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border border-blue-gray-200 table-fixed">
            <thead className="bg-blue-gray-50">
              <tr>
                <th className="border border-blue-gray-200 px-4 py-3 text-left text-xs font-bold uppercase text-blue-gray-600 w-1/4">
                  Title
                </th>
                <th className="border border-blue-gray-200 px-4 py-3 text-left text-xs font-bold uppercase text-blue-gray-600 w-2/4">
                  Paragraph
                </th>
                <th className="border border-blue-gray-200 px-4 py-3 text-left text-xs font-bold uppercase text-blue-gray-600 w-1/4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-gray-50">

                  {/* Title */}
                  <td className="border border-blue-gray-200  px-4 py-3">
                    {item.faq_title}
                  </td>

                  {/* Paragraph with Dot Dot */}
                  <td className="border border-blue-gray-200 px-4 py-3">
                    {truncateText(item.para, 120)}
                  </td>

                  {/* Action Buttons */}
                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/dashboard/cms/faq/edit/${item.id}`)
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
