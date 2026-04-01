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

  // 🔥 delete flags
  const [deleteFlags, setDeleteFlags] = useState({
    image1: false,
    imagechart: false,
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
            images = typeof res.data.image2 === "string"
              ? JSON.parse(res.data.image2)
              : res.data.image2 || [];
          } catch {
            images = [];
          }

          setFormData({ ...res.data, image2: [] }); // 🔥 important

          setPreviewImage1(res.data.image1 ? `${BASE_URL}/${res.data.image1}` : "");
          setPreviewChart(res.data.imagechart ? `${BASE_URL}/${res.data.imagechart}` : "");
          setPreviewImages(images.map(img => `${BASE_URL}/${img}`));
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

  // ================= IMAGE HANDLERS =================

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

  // 🔥 FORCE SORT BY NAME (or keep as is)
  files.sort((a, b) => a.name.localeCompare(b.name));

  setFormData((prev) => ({
    ...prev,
    image2: [...prev.image2, ...files],
  }));

  setPreviewImages((prev) => [
    ...prev,
    ...files.map(file => URL.createObjectURL(file)),
  ]);
};

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
console.log("FILES ORDER:", formData.image2.map(f => f.name));
  Object.entries(formData).forEach(([key, value]) => {
    if (key === "image2") {
      value.forEach((file, index) => {
        data.append("image2", file);
        data.append("image2_order[]", index); // 🔥 ORDER SENT
      });
    } else {
      data.append(key, value);
    }
  });

  data.append("deleteFlags", JSON.stringify(deleteFlags));

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

          <Typography>Select Category</Typography>
          <select
            className="border p-2 w-full"
            value={formData.solutionCatId}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                solutionCatId: e.target.value,
              }))
            }
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          <Typography>Heading</Typography>
          <Editor value={formData.heading} onChange={(val) => handleEditorChange("heading", val)} height={300} />

          <Typography>Description 1</Typography>
          <Editor value={formData.description1} onChange={(val) => handleEditorChange("description1", val)} height={300} />

          <Typography>Description 2</Typography>
          <Editor value={formData.description2} onChange={(val) => handleEditorChange("description2", val)} height={300} />

          {/* IMAGE1 */}
          <Typography>Upload Image1</Typography>
          <input type="file" onChange={handleImage1} />
          {previewImage1 && (
            <div className="relative inline-block">
              <img src={previewImage1} className="h-20 mt-2 rounded" />
              <button
                type="button"
                onClick={() => {
                  setPreviewImage1("");
                  setFormData(prev => ({ ...prev, image1: "" }));
                  setDeleteFlags(prev => ({ ...prev, image1: true }));
                }}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded-full"
              >✕</button>
            </div>
          )}

          {/* IMAGE CHART */}
          <Typography>Upload Image Chart</Typography>
          <input type="file" onChange={handleImageChart} />
          {previewChart && (
            <div className="relative inline-block">
              <img src={previewChart} className="h-20 mt-2 rounded" />
              <button
                type="button"
                onClick={() => {
                  setPreviewChart("");
                  setFormData(prev => ({ ...prev, imagechart: "" }));
                  setDeleteFlags(prev => ({ ...prev, imagechart: true }));
                }}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded-full"
              >✕</button>
            </div>
          )}

          {/* MULTIPLE IMAGES */}
          <Typography>Upload Multiple Images</Typography>
          <input type="file" multiple onChange={handleImage2} />

          <div className="flex gap-2 flex-wrap mt-2">
            {previewImages.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} className="h-20 rounded" />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImages(prev => prev.filter((_, i) => i !== index));
                    setDeleteFlags(prev => ({
                      ...prev,
                      image2: [...prev.image2, index],
                    }));
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded-full"
                >✕</button>
              </div>
            ))}
          </div>

          <Button type="submit" fullWidth>
            {id ? "Update" : "Create"}
          </Button>

        </form>
      </Card>
    </div>
  );
}