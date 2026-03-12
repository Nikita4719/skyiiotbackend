import { Card, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import BASE_URL from "../../../configs/api";


export default function ManagementSectionForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    heading: "",
    paragraph1: "",
    paragraph2: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [preview, setPreview] = useState({});
  const [existingImages, setExistingImages] = useState({});


  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/api/managementsection/${id}`)
        .then((res) => {
          const data = res.data;

          setFormData({
            heading: data.heading || "",
            paragraph1: data.paragraph1 || "",
            paragraph2: data.paragraph2 || "",
            image1: null,
            image2: null,
            image3: null,
            image4: null,
          });

          setPreview({
            image1: data.image1 ? `${BASE_URL}/${data.image1}` : null,
            image2: data.image2 ? `${BASE_URL}/${data.image2}` : null,
            image3: data.image3 ? `${BASE_URL}/${data.image3}` : null,
            image4: data.image4 ? `${BASE_URL}/${data.image4}` : null,
          });

          setExistingImages({
            image1: data.image1 || null,
            image2: data.image2 || null,
            image3: data.image3 || null,
            image4: data.image4 || null,
          });
        });
    }
  }, [id]);


  const handleEditorChange = (field, editor) => {
    setFormData(prev => ({ ...prev, [field]: editor.getData() }));
  };


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files[0]) return;

    setFormData(prev => ({ ...prev, [name]: files[0] }));
    setPreview(prev => ({ ...prev, [name]: URL.createObjectURL(files[0]) }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();


    ["heading", "paragraph1", "paragraph2"].forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });


    ["image1", "image2", "image3", "image4"].forEach(key => {
      if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else if (existingImages[key]) {
        data.append(key, existingImages[key]);
      }
    });

    try {
      if (id) {
        await axios.put(
          `${BASE_URL}/api/managementsection/${id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          `${BASE_URL}/api/managementsection`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      navigate("/dashboard/master/management-section");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          <Typography>Heading</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={formData.heading || ""}
            onChange={(e, editor) => handleEditorChange("heading", editor)}
          />

          <Typography>Paragraph 1</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={formData.paragraph1 || ""}
            onChange={(e, editor) => handleEditorChange("paragraph1", editor)}
          />

          <Typography>Paragraph 2</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={formData.paragraph2 || ""}
            onChange={(e, editor) => handleEditorChange("paragraph2", editor)}
          />

          {[1, 2, 3, 4].map(num => (
            <div key={num}>
              <Typography>Image {num}</Typography>
              <input type="file" name={`image${num}`} onChange={handleFileChange} />
              {preview[`image${num}`] && (
                <img src={preview[`image${num}`]} className="h-20 mt-2" alt="" />
              )}
            </div>
          ))}

          <Button type="submit" fullWidth>Save</Button>
        </form>
      </Card>
    </div>
  );
}