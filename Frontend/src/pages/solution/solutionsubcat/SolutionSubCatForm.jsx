import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import BASE_URL from "../../../configs/api";

export default function SolutionSubCatForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewChart, setPreviewChart] = useState("");
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

    image2: []

  });

  const [previewImage1, setPreviewImage1] = useState("");
  const [previewImages, setPreviewImages] = useState([]);



  useEffect(() => {

    const fetchData = async () => {

      try {

        const catRes = await axios.get(`${BASE_URL}/api/solution-cat`);
        setCategories(catRes.data);

        if (id) {
          const res = await axios.get(`${BASE_URL}/api/solution-sub-cat/${id}`);

          setFormData(res.data);

          setPreviewImage1(`${BASE_URL}/${res.data.image1}`);

           if (res.data.imagechart) {
    setPreviewChart(`${BASE_URL}/${res.data.imagechart}`);
  }
  
          let images = [];

          try {
            images =
              typeof res.data.image2 === "string"
                ? JSON.parse(res.data.image2)
                : res.data.image2 || [];
          } catch {
            images = [];
          }
          setFormData({
  ...res.data,
  image2: images
});

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

  // console.log("the data from the solution cat is", categories);

  const handleImage1 = (e) => {

    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      image1: file
    }));

    setPreviewImage1(URL.createObjectURL(file));

  };


  const handleImageChart = (e) => {

    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      imagechart: file
    }));

    setPreviewChart(URL.createObjectURL(file));

  };

  const handleImage2 = (e) => {

    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      image2: files
    }));

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("solutionCatId", formData.solutionCatId);

    data.append("heading", formData.heading);

    data.append("description1", formData.description1);
    data.append("description2", formData.description2);

    data.append("image1", formData.image1);
    data.append("imagechart", formData.imagechart);
    data.append("para1", formData.para1);
    data.append("para2", formData.para2);
    data.append("para3", formData.para3);
    data.append("para4", formData.para4);

    formData.image2.forEach((file) => {
      data.append("image2", file);
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



  if (loading) {
    return <div className="p-10">Loading...</div>;
  }



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
                solutionCatId: e.target.value
              }))
            }
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

          <CKEditor
            editor={ClassicEditor}
            data={formData.heading}
            onChange={(event, editor) => {
              setFormData({
                ...formData,
                heading: editor.getData()
              });
            }}
          />



          {/* DESCRIPTION1 */}

          <Typography>Description 1</Typography>

          <CKEditor
            editor={ClassicEditor}
            data={formData.description1}
            onChange={(event, editor) => {
              setFormData({
                ...formData,
                description1: editor.getData()
              });
            }}
          />



          {/* DESCRIPTION2 */}

          <Typography>Description 2</Typography>

          <CKEditor
            editor={ClassicEditor}
            data={formData.description2}
            onChange={(event, editor) => {
              setFormData({
                ...formData,
                description2: editor.getData()
              });
            }}
          />



          {/* IMAGE1 */}

          <Typography>Upload Image1</Typography>

          <input type="file" onChange={handleImage1} />

          {previewImage1 && (
            <img
              src={previewImage1}
              className="h-20 mt-2 rounded"
            />
          )}


          <Typography>Upload Image Chart</Typography>

          <input type="file" onChange={handleImageChart} />

          {previewChart && (
            <img
              src={previewChart}
              className="h-20 mt-2 rounded"
            />
          )}



          {/* PARA1 */}

          <Typography>Paragraph 1</Typography>

          <CKEditor
            editor={ClassicEditor}
            data={formData.para1}
            onChange={(event, editor) => {
              setFormData({
                ...formData,
                para1: editor.getData()
              });
            }}
          />



          {/* PARA2 */}

          <Typography>Paragraph 2</Typography>

          <CKEditor
            editor={ClassicEditor}
            data={formData.para2}
            onChange={(event, editor) => {
              setFormData({
                ...formData,
                para2: editor.getData()
              });
            }}
          />



          {/* PARA3 */}

          <Typography>Paragraph 3</Typography>

          <CKEditor
            editor={ClassicEditor}
            data={formData.para3}
            onChange={(event, editor) => {
              setFormData({
                ...formData,
                para3: editor.getData()
              });
            }}
          />



          {/* PARA4 */}

          <Typography>Paragraph 4</Typography>

          <CKEditor
            editor={ClassicEditor}
            data={formData.para4}
            onChange={(event, editor) => {
              setFormData({
                ...formData,
                para4: editor.getData()
              });
            }}
          />



          {/* MULTIPLE IMAGES */}

          <Typography>Upload Multiple Images</Typography>

          <input
            type="file"
            multiple
            onChange={handleImage2}
          />



          <div className="flex gap-2 flex-wrap mt-2">

            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                className="h-20 rounded"
                alt="preview"
              />
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