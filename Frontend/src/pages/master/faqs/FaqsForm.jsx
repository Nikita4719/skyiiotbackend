import { Card, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function FaqsForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/api/faqs/${id}`).then((res) => setTitle(res.data.title));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`${BASE_URL}/api/faqs/${id}`, { title });
    } else {
      await axios.post(`${BASE_URL}/api/faqs`, { title });
    }
    navigate("/dashboard/master/faqs");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Typography>Title</Typography>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" />
          <Button type="submit" fullWidth>Save</Button>
        </form>
      </Card>
    </div>
  );
}
