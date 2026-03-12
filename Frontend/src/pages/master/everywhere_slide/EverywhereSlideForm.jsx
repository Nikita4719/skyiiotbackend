import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function EverywhereSlideForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    heading: "",
    paragraph: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/everywhere-slide/${id}`)
        .then((res) => {
          setFormData({
            heading: res.data.heading || "",
            paragraph: res.data.paragraph || "",
            image: null,
          });

          if (res.data.image) {
            setPreview(
              `${BASE_URL}/${res.data.image}`
            );
          }
        });
    }
  }, [id]);

  const handleEditorChange = (field, editor) => {
    setFormData((prev) => ({
      ...prev,
      [field]: editor.getData(),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("heading", formData.heading);
    data.append("paragraph", formData.paragraph);

    if (formData.image) {
      data.append("image", formData.image);
    }

    if (id) {
      await axios.put(
        `${BASE_URL}/api/everywhere-slide/${id}`,
        data
      );
    } else {
      await axios.post(
        `${BASE_URL}/api/everywhere-slide`,
        data
      );
    }

    navigate("/dashboard/master/everywhere-slide");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          <Typography>Heading</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={formData.heading}
            onChange={(e, editor) =>
              handleEditorChange("heading", editor)
            }
          />

          <Typography>Paragraph</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={formData.paragraph}
            onChange={(e, editor) =>
              handleEditorChange("paragraph", editor)
            }
          />

          <Typography>Image</Typography>
          <input type="file" onChange={handleImageChange} />

          {preview && (
            <img
              src={preview}
              className="h-20 mt-3 rounded"
              alt=""
            />
          )}

          <Button type="submit" fullWidth>
            {id ? "Update" : "Save"}
          </Button>

        </form>
      </Card>
    </div>
  );
}