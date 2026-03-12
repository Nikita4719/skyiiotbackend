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


export default function WhatSectionForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/what-section/${id}`)
        .then((res) => {
          setFormData(res.data);

          if (res.data.image) {
            setPreview(`${BASE_URL}/${res.data.image}`);
          }
        });
    }
  }, [id]);

  const handleEditorChange = (editor) => {
    setFormData((prev) => ({
      ...prev,
      description: editor.getData(),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      if (id) {
        await axios.put(
          `${BASE_URL}/api/what-section/${id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          `${BASE_URL}/api/what-section`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      navigate("/dashboard/master/what-section");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">


          <div>
            <Typography>Title</Typography>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <Typography>Description</Typography>
            <CKEditor
              editor={ClassicEditor}
              data={formData.description || ""}
              onChange={(e, editor) =>
                handleEditorChange(editor)
              }
            />
          </div>

          {/* Image */}
          <div>
            <Typography>Image</Typography>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />

            {preview && (
              <img
                src={preview}
                className="h-20 mt-2 rounded"
                alt=""
              />
            )}
          </div>

          <Button type="submit" fullWidth>
            Save
          </Button>

        </form>
      </Card>
    </div>
  );
}