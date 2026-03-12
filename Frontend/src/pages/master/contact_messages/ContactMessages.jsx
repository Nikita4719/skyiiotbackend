import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function ContactMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/contact-messages`);
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await axios.delete(`${BASE_URL}/api/contact-messages/${id}`);
    fetchMessages();
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
            Contact Messages
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() =>
              navigate("/dashboard/master/contact-messages/add")
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
                  "First Name",
                  "Last Name",
                  "Email",
                  "Phone",
                  "Message",
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
              {messages.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-blue-gray-400"
                  >
                    No messages available
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-blue-gray-50">

                    <td className="border border-blue-gray-200 px-4 py-3">
                      {msg.first_name}
                    </td>

                    <td className="border border-blue-gray-200 px-4 py-3">
                      {msg.last_name}
                    </td>

                    <td className="border border-blue-gray-200 px-4 py-3">
                      {msg.email}
                    </td>

                    <td className="border border-blue-gray-200 px-4 py-3">
                      {msg.phone}
                    </td>

                    <td className="border border-blue-gray-200 px-4 py-3 max-w-xs truncate">
                      {msg.message}
                    </td>

                    <td className="border border-blue-gray-200 px-4 py-3 flex gap-2">

                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/dashboard/master/contact-messages/edit/${msg.id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDelete(msg.id)}
                      >
                        Delete
                      </Button>

                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </CardBody>
      </Card>
    </div>
  );
}