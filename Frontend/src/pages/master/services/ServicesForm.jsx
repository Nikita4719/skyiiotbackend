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

export default function ServicesForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    paragraph: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {

    if (id) {
      axios.get(`${BASE_URL}/api/services/${id}`)
        .then((res) => {

          const data = res.data;

          setFormData({
            title: data.title || "",
            heading: data.heading || "",
            paragraph: data.paragraph || "",
            image: null
          });

          if (data.image) {
            setPreview(`${BASE_URL}/${data.image}`);
          }

        });
    }

  }, [id]);

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file
    }));

    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {

      if (formData[key]) {
        data.append(key, formData[key]);
      }

    });

    if (id) {

      await axios.put(
        `${BASE_URL}/api/services/${id}`,
        data
      );

    } else {

      await axios.post(
        `${BASE_URL}/api/services`,
        data
      );

    }

    navigate("/dashboard/master/services");

  };

  return (

    <div className="mt-12 mb-8 px-6">

      <Card className="w-full p-10">

        <form onSubmit={handleSubmit} className="space-y-6">

          <Typography>Title</Typography>
          <Editor
            value={formData.title}
            onChange={(val) => handleEditorChange("title", val)}
            height={300}
          />

          <Typography>Heading</Typography>
          <Editor
            value={formData.heading}
            onChange={(val) => handleEditorChange("heading", val)}
            height={300}
          />

          <Typography>Paragraph</Typography>
          <Editor
            value={formData.paragraph}
            onChange={(val) => handleEditorChange("paragraph", val)}
            height={250}
          />

          <Typography>Image</Typography>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />

          {preview && (
            <img
              src={preview}
              className="h-24 mt-2"
              alt=""
            />
          )}

          <Button type="submit" fullWidth>
            Save
          </Button>

        </form>

      </Card>

    </div>

  );

}