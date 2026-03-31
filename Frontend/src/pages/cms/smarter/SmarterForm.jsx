import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";
import Editor from "@/pages/editor/editor";


export default function SmarterForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    heading: "",
    para: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await axios.get(
            `${BASE_URL}/api/smarter/${id}`
          );

          setForm({
            heading: res.data?.heading || "",
            para: res.data?.para || "",
          });

          setPreview(res.data?.media || null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);



  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  const handleEditorChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", form.heading);
    formData.append("para", form.para);

    if (e.target.media.files[0]) {
      formData.append("media", e.target.media.files[0]);
    }

    if (id) {
      await axios.put(
        `${BASE_URL}/api/smarter/${id}`,
        formData
      );
    } else {
      await axios.post(
        `${BASE_URL}/api/smarter`,
        formData
      );
    }

    navigate("/dashboard/cms/smarter");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* HEADING */}
          <Typography>Heading</Typography>
          <Editor
            value={form.heading}
            onChange={(val) => handleEditorChange("heading", val)}
            height={300}
          />

          {/* PARAGRAPH */}
          <Typography>Paragraph</Typography>
          <Editor
            value={form.para}
            onChange={(val) => handleEditorChange("para", val)}
            height={300}
          />

          {/* MEDIA */}
          <Typography>Image or Video</Typography>
          <input type="file" name="media" />

          {preview && (
            <div className="mt-3">
              <video
                src={`${BASE_URL}/${preview}`}
                controls
                className="h-24"
              />
            </div>
          )}

          <Button type="submit" fullWidth>
            {id ? "Update" : "Save"}
          </Button>

        </form>
      </Card>
    </div>
  );
}
