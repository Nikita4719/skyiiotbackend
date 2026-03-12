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


export default function OfferSection() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/offer`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/offer/${id}`);
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
            Offer Section
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/master/offer-section/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border border-blue-gray-200 table-auto text-sm">
            <thead className="bg-blue-gray-50">
              <tr>
                <th className="border border-blue-gray-200 px-3 py-2">Title</th>

                {[1, 2, 3, 4, 5].map(num => (
                  <th key={num} className="border border-blue-gray-200 px-3 py-2">
                    Heading {num}
                  </th>
                ))}

                {[1, 2, 3, 4].map(num => (
                  <th key={num} className="border border-blue-gray-200 px-3 py-2">
                    Paragraph {num}
                  </th>
                ))}

                {[1, 2].map(num => (
                  <th key={num} className="border border-blue-gray-200 px-3 py-2">
                    Image {num}
                  </th>
                ))}

                <th className="border border-blue-gray-200 px-3 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-gray-50">

                  {/* Title */}
                  <td className="border border-blue-gray-200 px-3 py-2 max-w-xs">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.title,
                      }}
                    />
                  </td>

                  {/* Headings */}
                  {[1, 2, 3, 4, 5].map(num => (
                    <td key={num} className="border border-blue-gray-200 px-3 py-2 max-w-xs">
                      <div
                        className="line-clamp-1"
                        dangerouslySetInnerHTML={{
                          __html: item[`heading${num}`],
                        }}
                      />
                    </td>
                  ))}

                  {/* Paragraphs */}
                  {[1, 2, 3, 4].map(num => (
                    <td key={num} className="border border-blue-gray-200 px-3 py-2 max-w-xs">
                      <div
                        className="line-clamp-1"
                        dangerouslySetInnerHTML={{
                          __html: item[`paragraph${num}`],
                        }}
                      />
                    </td>
                  ))}

                  {/* Images */}
                  {[1, 2].map(num => (
                    <td key={num} className="border border-blue-gray-200  px-3 py-2 text-center">
                      {item[`image${num}`] && (
                        <img
                          src={`${BASE_URL}/${item[`image${num}`]}`}
                          className="h-12 w-12 object-cover rounded mx-auto"
                          alt=""
                        />
                      )}
                    </td>
                  ))}

                  {/* Action */}
                  <td className="border border-blue-gray-200 px-3 py-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/dashboard/master/offer-section/edit/${item.id}`)
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
