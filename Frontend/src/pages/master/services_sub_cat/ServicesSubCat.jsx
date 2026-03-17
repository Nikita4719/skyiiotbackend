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

export default function ServicesSubCat() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {

    const res = await axios.get(`${BASE_URL}/api/services-sub-cat`);

    setData(res.data);

  };

  useEffect(() => {

    fetchData();

  }, []);

  const handleDelete = async (id) => {

    await axios.delete(`${BASE_URL}/api/services-sub-cat/${id}`);

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
            Services Sub Categories
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/master/services-sub-cat/add")
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
                  "Title",
                  "Description",
                  "Subheading",
                  "Subspan 1",
                  "Subspan 2",
                  "Subtitle Para 1",
                  "Subtitle Para 2",
                  "Category Link",
                  "Image",
                  "Image BG",
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

                  {/* TITLE */}
                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                  </td>

                  {/* DESCRIPTION */}
                  <td className="border border-blue-gray-200 px-4 py-3 max-w-sm">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </td>

                  {/* SUBHEADING */}
                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.subheading }}
                    />
                  </td>

                  {/* SUBSPAN1 */}
                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.subspan1 }}
                    />
                  </td>

                  {/* SUBSPAN2 */}
                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.subspan2 }}
                    />
                  </td>

                  {/* SUBTITLE PARA1 */}
                  <td className="border border-blue-gray-200 px-4 py-3 max-w-sm">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.subtitle_para1 }}
                    />
                  </td>

                  {/* SUBTITLE PARA2 */}
                  <td className="border border-blue-gray-200 px-4 py-3 max-w-sm">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.subtitle_para2 }}
                    />
                  </td>

                  {/* CATEGORY LINK */}
                  <td className="border border-blue-gray-200 px-4 py-3">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.category?.link }}
                    />
                  </td>

                  {/* IMAGE */}
                  <td className="border border-blue-gray-200 px-4 py-3">

                    {item.image && (

                      <img
                        src={`${BASE_URL}/${item.image}`}
                        className="h-14 w-20 object-cover rounded"
                        alt=""
                      />

                    )}

                  </td>

                  {/* IMAGEBG */}
                  <td className="border border-blue-gray-200 px-4 py-3">

                    {item.imagebg && (

                      <img
                        src={`${BASE_URL}/${item.imagebg}`}
                        className="h-14 w-20 object-cover rounded"
                        alt=""
                      />

                    )}

                  </td>

                  {/* ACTION */}
                  <td className="border border-blue-gray-200 px-4 py-3">

                    <div className="flex gap-2">

                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/dashboard/master/services-sub-cat/edit/${item.id}`)
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