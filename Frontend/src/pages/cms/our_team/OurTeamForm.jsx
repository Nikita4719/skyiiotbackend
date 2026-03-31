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


  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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

            <Editor
              value={formData.heading}
              onChange={(val) => handleEditorChange("heading", val)}
              height={300}
            />
          </div>


          {/* Paragraph */}
          <div>
            <Typography variant="small" className="mb-2 font-semibold">
              Paragraph
            </Typography>

            <Editor
              value={formData.paragraph}
              onChange={(val) => handleEditorChange("paragraph", val)}
              height={250}
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