import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../configs/api";
import Editor from "@/pages/editor/editor";

export default function SolutionSubCatForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewChart, setPreviewChart] = useState("");
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  const [formData, setFormData] = useState({
    solutionCatId: "",
    heading: "",
    description1: "",
    description2: "",
    image1: "",
    imagechart: "",
    para1: "",
    para2: "",
    para3: "",
    para4: "",
    image2: [],
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get(`${BASE_URL}/api/solution-cat`);
        setCategories(catRes.data);

        if (id) {
          const res = await axios.get(`${BASE_URL}/api/solution-sub-cat/${id}`);

          let images = [];
          try {
            images = typeof res.data.image2 === "string" ? JSON.parse(res.data.image2) : res.data.image2 || [];
          } catch {
            images = [];
          }

          setFormData({ ...res.data, image2: images });
          setPreviewImage1(`${BASE_URL}/${res.data.image1}`);
          if (res.data.imagechart) setPreviewChart(`${BASE_URL}/${res.data.imagechart}`);
          setPreviewImages(images.map((img) => `${BASE_URL}/${img}`));
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;


  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image1: file }));
    setPreviewImage1(URL.createObjectURL(file));
  };

  const handleImageChart = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imagechart: file }));
    setPreviewChart(URL.createObjectURL(file));
  };

  const handleImage2 = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, image2: files }));
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image2") {
        value.forEach((file) => data.append(key, file));
      } else {
        data.append(key, value);
      }
    });

    try {
      if (id) {
        await axios.put(`${BASE_URL}/api/solution-sub-cat/${id}`, data);
      } else {
        await axios.post(`${BASE_URL}/api/solution-sub-cat`, data);
      }

      navigate("/dashboard/solution/solution-sub-cat");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* CATEGORY */}
          <Typography>Select Category</Typography>
          <select
            className="border p-2 w-full"
            value={formData.solutionCatId}
            onChange={(e) => setFormData((prev) => ({ ...prev, solutionCatId: e.target.value }))}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          {/* HEADING */}
          <Typography>Heading</Typography>
          <Editor value={formData.heading} onChange={(val) => handleEditorChange("heading", val)} height={300} />

          {/* DESCRIPTION1 */}
          <Typography>Description 1</Typography>
          <Editor value={formData.description1} onChange={(val) => handleEditorChange("description1", val)} height={300} />

          {/* DESCRIPTION2 */}
          <Typography>Description 2</Typography>
          <Editor value={formData.description2} onChange={(val) => handleEditorChange("description2", val)} height={300} />

          {/* IMAGE1 */}
          <Typography>Upload Image1</Typography>
          <input type="file" onChange={handleImage1} />
          {previewImage1 && <img src={previewImage1} className="h-20 mt-2 rounded" />}

          {/* IMAGE CHART */}
          <Typography>Upload Image Chart</Typography>
          <input type="file" onChange={handleImageChart} />
          {previewChart && <img src={previewChart} className="h-20 mt-2 rounded" />}

          {/* PARAGRAPHS */}
          {["para1", "para2", "para3", "para4"].map((para, idx) => (
            <div key={para}>
              <Typography>Paragraph {idx + 1}</Typography>
              <Editor value={formData[para]} onChange={(val) => handleEditorChange(para, val)} height={300} />
            </div>
          ))}

          {/* MULTIPLE IMAGES */}
          <Typography>Upload Multiple Images</Typography>
          <input type="file" multiple onChange={handleImage2} />
          <div className="flex gap-2 flex-wrap mt-2">
            {previewImages.map((img, index) => (
              <img key={index} src={img} className="h-20 rounded" alt="preview" />
            ))}
          </div>

          <Button type="submit" fullWidth>{id ? "Update" : "Create"}</Button>

        </form>
      </Card>
    </div>
  );
}