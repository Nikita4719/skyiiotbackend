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


export default function OurTeamForm() {
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
        .get(`${BASE_URL}/api/our-team/${id}`)
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
        })
        .catch((err) => {
          console.error("Fetch error:", err);
        });
    }
  }, [id]);

  /* ================= CKEDITOR CHANGE ================= */
  const handleEditorChange = (field, editor) => {
    setFormData((prev) => ({
      ...prev,
      [field]: editor.getData(),
    }));
  };

  /* ================= IMAGE CHANGE ================= */
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

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("heading", formData.heading);
    data.append("paragraph", formData.paragraph);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (id) {
        await axios.put(
          `${BASE_URL}/api/our-team/${id}`,
          data
        );
      } else {
        await axios.post(
          `${BASE_URL}/api/our-team`,
          data
        );
      }

      navigate("/dashboard/cms/our-team");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Heading */}
          <div>
            <Typography variant="small" className="mb-2 font-semibold">
              Heading
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              data={formData.heading}
              onChange={(e, editor) =>
                handleEditorChange("heading", editor)
              }
            />
          </div>

          {/* Paragraph */}
          <div>
            <Typography variant="small" className="mb-2 font-semibold">
              Paragraph
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              data={formData.paragraph}
              onChange={(e, editor) =>
                handleEditorChange("paragraph", editor)
              }
            />
          </div>

          {/* Image */}
          <div>
            <Typography variant="small" className="mb-2 font-semibold">
              Image
            </Typography>

            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="block w-full text-sm"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-24 mt-3 rounded-lg object-cover"
              />
            )}
          </div>

          {/* Submit */}
          <Button type="submit" fullWidth>
            {id ? "Update" : "Save"}
          </Button>
        </form>
      </Card>
    </div>
  );
}