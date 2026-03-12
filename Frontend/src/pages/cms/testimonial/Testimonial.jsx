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


export default function Testimonial() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/testimonials`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${BASE_URL}/api/testimonials/${id}`
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
            Testimonial
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/cms/testimonial/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border table-auto text-sm">

           
            <thead className="bg-blue-gray-50">
              <tr>
                <th className="border-blue-gray-200  border px-3 py-2">Heading</th>
                <th className="border-blue-gray-200  border px-3 py-2">Para 1</th>
                <th className="border-blue-gray-200  border px-3 py-2">Para 2</th>
                <th className="border-blue-gray-200  border px-3 py-2">Image 1</th>
                <th className="border-blue-gray-200  border px-3 py-2">Image 2</th>
                <th className="border-blue-gray-200  border px-3 py-2">Image 3</th>
                <th className="border-blue-gray-200  border px-3 py-2">Action</th>
              </tr>
            </thead>

         
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>

               
                    <td
                      className="border-blue-gray-200  border px-3 py-2"
                      dangerouslySetInnerHTML={{
                        __html: item.heading,
                      }}
                    />

                   
                    <td
                      className="border-blue-gray-200  border px-3 py-2"
                      dangerouslySetInnerHTML={{
                        __html: item.para1,
                      }}
                    />

                
                    <td
                      className="border-blue-gray-200  border px-3 py-2"
                      dangerouslySetInnerHTML={{
                        __html: item.para2,
                      }}
                    />

                  
                    <td className="border-blue-gray-200  border px-3 py-2 text-center">
                      {item.image1 && (
                        <img
                          src={`${BASE_URL}/${item.image1}`}
                          className="h-14 w-14 object-cover mx-auto rounded"
                          alt=""
                        />
                      )}
                    </td>

                
                    <td className="border-blue-gray-200  border px-3 py-2 text-center">
                      {item.image2 && (
                        <img
                          src={`${BASE_URL}/${item.image2}`}
                          className="h-14 w-14 object-cover mx-auto rounded"
                          alt=""
                        />
                      )}
                    </td>

                    
                    <td className="border-blue-gray-200  border px-3 py-2 text-center">
                      {item.image3 && (
                        <img
                          src={`${BASE_URL}/${item.image3}`}
                          className="h-14 w-14 object-cover mx-auto rounded"
                          alt=""
                        />
                      )}
                    </td>

                 
                    <td className="border-blue-gray-200  border px-3 py-2">
                      <div className="flex gap-2">

                        <Button
                          size="sm"
                          variant="outlined"
                          onClick={() =>
                            navigate(
                              `/dashboard/cms/testimonial/edit/${item.id}`
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
                    colSpan="7"
                    className="text-center py-6"
                  >
                    No Data Found
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
