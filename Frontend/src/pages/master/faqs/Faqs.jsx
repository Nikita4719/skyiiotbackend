import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../../configs/api";


export default function Faqs() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/faqs`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/faqs/${id}`);
    fetchData();
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card>
        <CardHeader className="flex justify-between items-center p-6" variant="gradient" color="gray">
          <Typography variant="h6" color="white">FAQs (Master)</Typography>
          <Button size="sm" color="white" onClick={() => navigate("/dashboard/master/faqs/add")}>Add</Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full border border-blue-gray-200 table-auto">
            <thead className="bg-blue-gray-50">
              <tr>
                {["Title", "Action"].map((head) => (
                  <th key={head} className="border border-blue-gray-200 px-4 py-3 text-left text-xs font-bold uppercase text-blue-gray-600">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-gray-50">
                  <td className="border border-blue-gray-200 px-4 py-3">{item.title}</td>
                  <td className="border border-blue-gray-200 px-4 py-3 flex gap-2">
                    <Button size="sm" variant="outlined" onClick={() => navigate(`/dashboard/master/faqs/edit/${item.id}`)}>Edit</Button>
                    <Button size="sm" color="red" onClick={() => handleDelete(item.id)}>Delete</Button>
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
