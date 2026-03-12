import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";


export default function TestimonialForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    heading: "",
    para1: "",
    para2: "",
  });

  const [preview, setPreview] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await axios.get(
            `${BASE_URL}/api/testimonials/${id}`
          );


          setForm({
            heading: res.data?.heading || "",
            para1: res.data?.para1 || "",
            para2: res.data?.para2 || "",
          });

          setPreview({
            image1: res.data?.image1 || null,
            image2: res.data?.image2 || null,
            image3: res.data?.image3 || null,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Prevent render before data ready
  if (loading) {
    return <div className="p-10">Loading...</div>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", form.heading);
    formData.append("para1", form.para1);
    formData.append("para2", form.para2);

    ["image1", "image2", "image3"].forEach((field) => {
      if (e.target[field].files[0]) {
        formData.append(field, e.target[field].files[0]);
      }
    });

    try {
      if (id) {
        await axios.put(
          `${BASE_URL}/api/testimonials/${id}`,
          formData
        );
      } else {
        await axios.post(
          `${BASE_URL}/api/testimonials`,
          formData
        );
      }

      navigate("/dashboard/cms/testimonial");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* HEADING */}
          <Typography>Heading</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={form.heading}
            onChange={(event, editor) => {
              const data = editor.getData();
              setForm((prev) => ({
                ...prev,
                heading: data,
              }));
            }}
          />

          {/* PARA 1 */}
          <Typography>Paragraph 1</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={form.para1}
            onChange={(event, editor) => {
              const data = editor.getData();
              setForm((prev) => ({
                ...prev,
                para1: data,
              }));
            }}
          />

          {/* PARA 2 */}
          <Typography>Paragraph 2</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={form.para2}
            onChange={(event, editor) => {
              const data = editor.getData();
              setForm((prev) => ({
                ...prev,
                para2: data,
              }));
            }}
          />

          {/* IMAGES */}
          {[1, 2, 3].map((num) => (
            <div key={num}>
              <Typography>Image {num}</Typography>
              <input type="file" name={`image${num}`} />

              {preview[`image${num}`] && (
                <img
                  src={`${BASE_URL}/${preview[`image${num}`]}`}
                  className="h-20 mt-3"
                  alt=""
                />
              )}
            </div>
          ))}

          <Button type="submit" fullWidth>
            {id ? "Update" : "Save"}
          </Button>

        </form>
      </Card>
    </div>
  );
}
