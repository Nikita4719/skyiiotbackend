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


export default function SupportedContent() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/supported-content`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${BASE_URL}/api/supported-content/${id}`
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
            Supported Content Section
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate(
                "/dashboard/master/supported-section/add"
              )
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
                  "Heading",
                  "Paragraph 1",
                  "Paragraph 2",
                  "Images",
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
                <tr key={item.id}>
                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.heading,
                      }}
                    />
                  </td>

                  <td className="border border-blue-gray-200 px-4 py-3 max-w-xs">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.paragraph1,
                      }}
                    />
                  </td>


                  <td className="border border-blue-gray-200 px-4 py-3 max-w-xs">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.paragraph2,
                      }}
                    />
                  </td>

                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((num) =>
                        item[`image${num}`] ? (
                          <img
                            key={num}
                            src={`${BASE_URL}/${item[`image${num}`]}`}
                            className="h-12 w-12 object-cover rounded"
                            alt=""
                          />
                        ) : null
                      )}
                    </div>
                  </td>

                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/dashboard/master/supported-section/edit/${item.id}`
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
