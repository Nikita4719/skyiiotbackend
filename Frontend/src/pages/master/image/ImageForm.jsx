import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@/pages/editor/editor";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function ImageForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    heading: "",
    paragraph: "",
    image: null,
    bgimage: null,
  });

  const [preview, setPreview] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/image/${id}`)
        .then((res) => {
          setFormData(res.data);

          if (res.data.image)
            setPreview({
              image: `${BASE_URL}/${res.data.image}`,
            });

          if (res.data.bgimage)
            setPreview((prev) => ({
              ...prev,
              bgimage: `${BASE_URL}/${res.data.bgimage}`,
            }));
        });
    }
  }, [id]);

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));

    setPreview((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(files[0]),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (id) {
      await axios.put(
        `${BASE_URL}/api/image/${id}`,
        data
      );
    } else {
      await axios.post(
        `${BASE_URL}/api/image`,
        data
      );
    }

    navigate("/dashboard/master/image");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

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
            onChange={handleImageChange}
          />
          {preview.image && (
            <img src={preview.image} className="h-20 mt-2" />
          )}

          <Typography>Background Image</Typography>
          <input
            type="file"
            name="bgimage"
            onChange={handleImageChange}
          />

          {preview.bgimage && (
            <img src={preview.bgimage} className="h-20 mt-2" />
          )}

          <Button type="submit" fullWidth>
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
}
