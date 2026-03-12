import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function ContactSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({});

  // Fetch settings from API
  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/contact-settings`);
      //   console.log(res.data[0]);
      setSettings(res.data[0] || {});
    } catch (error) {
      console.error(error);
    }
  };

  // Delete settings
  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      await axios.delete(`${BASE_URL}/api/contact-settings/${id}`);
      alert("Deleted Successfully");
      fetchSettings();
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="mt-12 mb-8 px-6">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="flex justify-between items-center p-6"
        >
          <Typography variant="h6" color="white">
            Contact Settings
          </Typography>

          <Button
            size="sm"
            color="white"
            onClick={() => navigate("/dashboard/master/contact-settings/add")}
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border border-blue-gray-200">
            <thead className="bg-blue-gray-50">
              <tr>
                <th className="border px-4 py-3">Map URL</th>
                <th className="border px-4 py-3">BG Image</th>
                <th className="border px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {settings.id && (
                <tr>
                  <td className="border px-4 py-3 max-w-[250px]">
                    <span className="block truncate" title={settings.map_url}>
                      {settings.map_url}
                    </span>
                  </td>
                  <td className="border px-4 py-3 max-w-[250px] truncate">
                    <img
                      src={`${BASE_URL}/uploads/${settings.bg_image}`}
                      width="120"
                      alt="BG"
                    />
                  </td>
                  <td className="border px-4 py-3 flex gap-2">
                    <Button
                      size="sm"
                      color="white"
                      onClick={() => navigate(`/dashboard/master/contact-settings/edit/${settings.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleDelete(settings.id)}
                    >
                      Delete
                    </Button>
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