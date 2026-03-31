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

export default function OfferSectionForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    heading1: "",
    heading2: "",
    heading3: "",
    heading4: "",
    heading5: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    paragraph4: "",
    image1: null,
    image2: null,
  });

  const [preview, setPreview] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/offer/${id}`)
        .then((res) => {

          const data = res.data;

          setFormData({
            ...data,
            image1: null,
            image2: null,
          });

          const images = {};
          [1, 2].forEach((num) => {
            if (data[`image${num}`]) {
              images[`image${num}`] =
                `${BASE_URL}/${data[`image${num}`]}`;
            }
          });

          setPreview(images);
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

    if (!files[0]) return;

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
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (id) {
      await axios.put(
        `${BASE_URL}/api/offer/${id}`,
        data
      );
    } else {
      await axios.post(
        `${BASE_URL}/api/offer`,
        data
      );
    }

    navigate("/dashboard/master/offer-section");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <Typography>Title</Typography>
          <Editor
            value={formData.title}
            onChange={(val) => handleEditorChange("title", val)}
            height={300}
          />

          {/* Headings */}
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num}>
              <Typography>Heading {num}</Typography>

              <Editor
                value={formData[`heading${num}`]}
                onChange={(val) =>
                  handleEditorChange(`heading${num}`, val)
                }
                height={300}
              />
            </div>
          ))}

          {/* Paragraphs */}
          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <Typography>Paragraph {num}</Typography>

              <Editor
                value={formData[`paragraph${num}`]}
                onChange={(val) =>
                  handleEditorChange(`paragraph${num}`, val)
                }
                height={300}
              />
            </div>
          ))}

          {/* Images */}
          {[1, 2].map((num) => (
            <div key={num}>
              <Typography>Image {num}</Typography>

              <input
                type="file"
                name={`image${num}`}
                accept="image/*"
                onChange={handleImageChange}
              />

              {preview[`image${num}`] && (
                <img
                  src={preview[`image${num}`]}
                  className="h-20 mt-2"
                  alt=""
                />
              )}
            </div>
          ))}

          {/* Submit */}
          <Button type="submit" fullWidth>
            {id ? "Update" : "Save"}
          </Button>

        </form>

      </Card>
    </div>
  );
}