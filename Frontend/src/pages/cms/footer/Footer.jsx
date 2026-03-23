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

export default function Footer() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchFooter = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/footer`);
      if (res.data) setData([res.data]);
    } catch (err) {
      console.error("Error fetching footer:", err);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/footer/${id}`);
      setData([]);
    } catch (err) {
      console.error(err);
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
            Footer Section
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() => navigate("/dashboard/cms/footer/add")}
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border border-blue-gray-200 table-auto">
            <thead className="bg-blue-gray-50">
              <tr>
                {[
                  "Logo", 
                  "Title",
                  "Content",
                  "Email",
                  "Phone",
                  "Address",
                  "QR 1",
                  "QR 2",
                  "QR 3",
                  "QR 4",
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
              {data.map((item) => {
                const qrCodes =
                  item.qr_code && item.qr_code !== "null"
                    ? JSON.parse(item.qr_code)
                    : [];

                return (
                  <tr key={item.id} className="hover:bg-blue-gray-50">

                    {/* ✅ LOGO */}
                    <td className="border border-blue-gray-200 px-4 py-3 text-center">
                      {item.logo ? (
                        <img
                         src={`${BASE_URL}/uploads/qrcodes/${item.logo}`}
                          className="h-20 w-25 object-cover mx-auto"
                          alt="logo"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Title */}
                    <td className="border border-blue-gray-200 px-4 py-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.title || "-",
                        }}
                      />
                    </td>

                    {/* Content */}
                    <td className="border border-blue-gray-200 px-4 py-3 max-w-[250px]">
                      <div
                        className="line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: item.content || "-",
                        }}
                      />
                    </td>

                    {/* Email */}
                    <td className="border border-blue-gray-200 px-4 py-3">
                      {item.contact_email || "-"}
                    </td>

                    {/* Phone */}
                    <td className="border border-blue-gray-200 px-4 py-3">
                      {item.contact_phone || "-"}
                    </td>

                    {/* Address */}
                    <td className="border border-blue-gray-200 px-4 py-3 max-w-[200px]">
                      <div
                        className="line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: item.address || "-",
                        }}
                      />
                    </td>

                    {/* QR Codes */}
                    {[0, 1, 2, 3].map((i) => (
                      <td
                        key={i}
                        className="border border-blue-gray-200 px-4 py-3 text-center"
                      >
                        {qrCodes[i] ? (
                          <img
                            src={`${BASE_URL}/uploads/qrcodes/${qrCodes[i]}`}
                            className="h-14 w-14 object-cover mx-auto"
                            alt="qr"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                    ))}

                    {/* Action */}
                    <td className="border border-blue-gray-200 px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                           variant="outlined"
                          onClick={() =>
                            navigate(`/dashboard/cms/footer/edit/${item.id}`)
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
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}