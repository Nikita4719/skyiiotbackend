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

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/aboutusbenefits`
      );

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

                {[1,2,3,4,5,6,7,8].map((i)=>(
                  <th
                    key={`heading${i}`}
                    className="border border-blue-gray-200 px-3 py-2 text-xs font-bold uppercase"
                  >
                    Heading {i}
                  </th>
                ))}

                {[1,2,3,4].map((i)=>(
                  <th
                    key={`paragraph${i}`}
                    className="border border-blue-gray-200 px-3 py-2 text-xs font-bold uppercase"
                  >
                    Paragraph {i}
                  </th>
                ))}

                <th className="border border-blue-gray-200 px-3 py-2 text-xs font-bold uppercase">
                  Images
                </th>

                <th className="border border-blue-gray-200 px-3 py-2 text-xs font-bold uppercase">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-gray-50"
                >

                  {[1,2,3,4,5,6,7,8].map((i)=>(
                    <td
                      key={`heading${i}`}
                      className="border border-blue-gray-200 px-3 py-2 max-w-xs"
                    >
                      <div
                        className="line-clamp-2 overflow-hidden text-ellipsis"
                        dangerouslySetInnerHTML={{
                          __html: item[`heading${i}`] || ""
                        }}
                      />
                    </td>
                  ))}

                  {[1,2,3,4].map((i)=>(
                    <td
                      key={`paragraph${i}`}
                      className="border border-blue-gray-200 px-3 py-2 max-w-sm"
                    >
                      <div
                        className="line-clamp-2 overflow-hidden text-ellipsis"
                        dangerouslySetInnerHTML={{
                          __html: item[`paragraph${i}`] || ""
                        }}
                      />
                    </td>
                  ))}

<td className="border border-blue-gray-200 px-3 py-2 min-w-[220px]">
  <div className="flex flex-wrap gap-2 max-w-[220px]">
    {item.images && item.images.map((img, index) => (
      <div key={index} className="w-[60px] h-[60px] flex-shrink-0">
        <img
          src={`${BASE_URL}/${img}`}
          alt="img"
          className="w-full h-full object-cover rounded border"
        />
      </div>
    ))}
  </div>
</td>
                  {/* <td className="border border-blue-gray-200 px-3 py-2 text-center">
                    <div className="flex gap-2 flex-wrap justify-center">

                      {item.images?.map((img,i)=>(
                        <img
                          key={i}
                          src={`${BASE_URL}/${img}`}
                          className="h-14 w-14 object-cover rounded-lg"
                          alt=""
                        />
                      ))}

                    </div>
                  </td> */}

                  <td className="border border-blue-gray-200 px-3 py-2">
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