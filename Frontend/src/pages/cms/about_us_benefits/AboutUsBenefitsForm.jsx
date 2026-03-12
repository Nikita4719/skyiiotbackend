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

export default function AboutUsBenefitsForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = {
    image1: null,
    image2: null,
  };

  for (let i = 1; i <= 8; i++) {
    initialState[`heading${i}`] = "";
  }

  for (let i = 1; i <= 4; i++) {
    initialState[`paragraph${i}`] = "";
  }

  const [formData, setFormData] = useState(initialState);
  const [preview, setPreview] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(
          `${BASE_URL}/api/aboutusbenefits/${id}`
        )
        .then((res) => {
          setFormData(res.data);

          if (res.data.image1)
            setPreview((p) => ({
              ...p,
              image1: `${BASE_URL}/${res.data.image1}`,
            }));

          if (res.data.image2)
            setPreview((p) => ({
              ...p,
              image2: `${BASE_URL}/${res.data.image2}`,
            }));
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
        `${BASE_URL}/api/aboutusbenefits/${id}`,
        data
      );
    } else {
      await axios.post(
        `${BASE_URL}/api/aboutusbenefits`,
        data
      );
    }

    navigate("/dashboard/cms/about-us-benefits");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={`heading${i}`}>
              <Typography>Heading {i}</Typography>
              <CKEditor
                editor={ClassicEditor}
                data={formData[`heading${i}`] || ""}
                onChange={(e, editor) =>
                  handleEditorChange(`heading${i}`, editor)
                }
              />
            </div>
          ))}

          {[1, 2, 3, 4].map((i) => (
            <div key={`paragraph${i}`}>
              <Typography>Paragraph {i}</Typography>
              <CKEditor
                editor={ClassicEditor}
                data={formData[`paragraph${i}`] || ""}
                onChange={(e, editor) =>
                  handleEditorChange(`paragraph${i}`, editor)
                }
              />
            </div>
          ))}

          <Typography>Image 1</Typography>
          <input type="file" name="image1" onChange={handleImageChange} />
          {preview.image1 && (
            <img src={preview.image1} className="h-20 mt-2" />
          )}

          <Typography>Image 2</Typography>
          <input type="file" name="image2" onChange={handleImageChange} />
          {preview.image2 && (
            <img src={preview.image2} className="h-20 mt-2" />
          )}

          <Button type="submit" fullWidth>
            Save
          </Button>

        </form>
      </Card>
    </div>
  );
}
