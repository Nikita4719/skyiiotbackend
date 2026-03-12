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

export default function AboutUsBenefits() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // Fetch Data
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/aboutusbenefits`
      );

      // If backend returns { success: true, data }
      if (res.data.data) {
        setData(res.data.data);
      } else {
        setData(res.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/aboutusbenefits/${id}`
      );
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
            About Us Benefits
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/cms/about-us-benefits/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border table-auto text-sm whitespace-normal">
            <thead className="bg-blue-gray-50">
              <tr>
                {/* 8 Headings */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <th
                    key={`heading${i}`}
                    className="border border-blue-gray-200  px-3 py-2 text-xs font-bold uppercase"
                  >
                    Heading {i}
                  </th>
                ))}

                {/* 4 Paragraphs */}
                {[1, 2, 3, 4].map((i) => (
                  <th
                    key={`paragraph${i}`}
                    className="border border-blue-gray-200  px-3 py-2 text-xs font-bold uppercase"
                  >
                    Paragraph {i}
                  </th>
                ))}

                <th className="border border-blue-gray-200  px-3 py-2 text-xs font-bold uppercase">
                  Image 1
                </th>

                <th className="border border-blue-gray-200  px-3 py-2 text-xs font-bold uppercase">
                  Image 2
                </th>

                <th className="border border-blue-gray-200  px-3 py-2 text-xs font-bold uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-blue-gray-50"
                >
                  {/* 8 Headings */}
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <td
                      key={`heading${i}`}
                      className="border border-blue-gray-200 px-3 py-2 max-w-xs"
                    >
                      <div
                        className="line-clamp-2 overflow-hidden text-ellipsis"
                        dangerouslySetInnerHTML={{
                          __html: item[`heading${i}`] || "",
                        }}
                      />
                    </td>
                  ))}

                  {/* 4 Paragraphs */}
                  {[1, 2, 3, 4].map((i) => (
                    <td
                      key={`paragraph${i}`}
                      className="border border-blue-gray-200  px-3 py-2 max-w-sm"
                    >
                      <div
                        className="line-clamp-2 overflow-hidden text-ellipsis"
                        dangerouslySetInnerHTML={{
                          __html: item[`paragraph${i}`] || "",
                        }}
                      />
                    </td>
                  ))}

                  {/* Image 1 */}
                  <td className="border border-blue-gray-200  px-3 py-2 text-center">
                    {item.image1 && (
                      <img
                        src={`${BASE_URL}/${item.image1}`}
                        className="h-14 w-14 object-cover rounded-lg mx-auto"
                        alt=""
                      />
                    )}
                  </td>

                  {/* Image 2 */}
                  <td className="border border-blue-gray-200  px-3 py-2 text-center">
                    {item.image2 && (
                      <img
                        src={`${BASE_URL}/${item.image2}`}
                        className="h-14 w-14 object-cover rounded-lg mx-auto"
                        alt=""
                      />
                    )}
                  </td>

                  {/* Actions */}
                  <td className="border border-blue-gray-200  px-3 py-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/dashboard/cms/about-us-benefits/edit/${item.id}`)

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
