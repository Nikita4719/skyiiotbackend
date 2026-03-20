import {
  Card,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function SolutionCatForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ================= GET DATA FOR EDIT ================= */

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/solution-cat/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setPreview(`${BASE_URL}/${res.data.image}`);
        });
    }
  }, [id]);

  /* ================= IMAGE CHANGE ================= */

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setImage(file);   // ✅ FIXED

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    if (image) {
      formData.append("image", image);
    }

    try {

      if (id) {

        await axios.put(
          `${BASE_URL}/api/solution-cat/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

      } else {

        await axios.post(
          `${BASE_URL}/api/solution-cat`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

      }

      navigate("/dashboard/solution/solution-cat");

    } catch (error) {

      console.error("SAVE ERROR:", error.response?.data || error);

    }

  };

  return (
    <div className="mt-12 mb-8 px-6">

      <Card className="p-10">

        <form onSubmit={handleSubmit} className="space-y-6">

          <Typography>Title</Typography>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Typography>Image</Typography>

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

          <Button type="submit" fullWidth>
            Save
          </Button>

        </form>

      </Card>

    </div>
  );
}