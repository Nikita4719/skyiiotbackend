import { Card, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../configs/api";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function ServicesSubCatForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [previewBg, setPreviewBg] = useState(null);
  const [formData, setFormData] = useState({

    service_id: "",
    services_category_id: "",
    title: "",
    description: "",
    subheading: "",
    subspan1: "",
    subspan2: "",
    subtitle_para1: "",
    subtitle_para2: "",
    image: null,
    imagebg: null

  });

  useEffect(() => {

    axios.get(`${BASE_URL}/api/services`)
      .then(res => setServices(res.data));

    if (id) {

      axios.get(`${BASE_URL}/api/services-sub-cat/${id}`)
        .then(res => {

          const data = res.data;

          setFormData({
            service_id: data.category?.service_id,
            services_category_id: data.services_category_id,
            title: data.title,
            description: data.description,
            subheading: data.subheading,
            subspan1: data.subspan1,
            subspan2: data.subspan2,
            subtitle_para1: data.subtitle_para1,
            subtitle_para2: data.subtitle_para2,
            image: null,
            imagebg:null
          });

          if (data.category?.service_id) {
            fetchCategories(data.category.service_id);
          }

          if (data.image) {
            setPreview(`${BASE_URL}/${data.image}`);
          }

          if (data.imagebg) {
            setPreviewBg(`${BASE_URL}/${data.imagebg}`);
          }

        });

    }

  }, [id]);

  const fetchCategories = async (serviceId) => {

    const res = await axios.get(`${BASE_URL}/api/services-category`);

    const filtered = res.data.filter(
      item => item.service_id === Number(serviceId)
    );

    setCategories(filtered);

  };

  const handleServiceChange = (e) => {

    const serviceId = e.target.value;

    setFormData({
      ...formData,
      service_id: serviceId,
      services_category_id: ""
    });

    fetchCategories(serviceId);

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleEditorChange = (field, editor) => {

    const data = editor.getData();

    setFormData(prev => ({
      ...prev,
      [field]: data
    }));

  };

  const handleFile = (e) => {

    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file
    });

    setPreview(URL.createObjectURL(file));

  };

  const handleFileBg = (e) => {

    const file = e.target.files[0];

    setFormData({
      ...formData,
      imagebg: file
    });

    setPreviewBg(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach(key => {

      if (formData[key]) {
        data.append(key, formData[key]);
      }

    });

    if (id) {

      await axios.put(
        `${BASE_URL}/api/services-sub-cat/${id}`,
        data
      );

    } else {

      await axios.post(
        `${BASE_URL}/api/services-sub-cat`,
        data
      );

    }

    navigate("/dashboard/master/services-sub-cat");

  };

  return (

    <div className="mt-12 px-6">

      <Card className="p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* SERVICE */}

          <div>

            <Typography>Service</Typography>

            <select
              value={formData.service_id}
              onChange={handleServiceChange}
              className="border p-2 w-full"
            >

              <option value="">Select Service</option>

              {services.map(item => (

                <option key={item.id} value={item.id}>
                  {item.title}
                </option>

              ))}

            </select>

          </div>

          {/* CATEGORY */}

          <div>

            <Typography>Category</Typography>

            <select
              name="services_category_id"
              value={formData.services_category_id}
              onChange={handleChange}
              className="border p-2 w-full"
            >

              <option value="">Select Category</option>

              {categories.map(item => (

                <option key={item.id} value={item.id}>
                  {item.link}
                </option>

              ))}

            </select>

          </div>

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <Typography>Description</Typography>

          <CKEditor
            editor={ClassicEditor}
            data={formData.description}
            onChange={(event, editor) =>
              handleEditorChange("description", editor)
            }
          />

          <input
            name="subheading"
            placeholder="SubHeading"
            value={formData.subheading}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="subspan1"
            placeholder="SubSpan1"
            value={formData.subspan1}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="subspan2"
            placeholder="SubSpan2"
            value={formData.subspan2}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <Typography>Subtitle Para 1</Typography>

          <CKEditor
            editor={ClassicEditor}
            data={formData.subtitle_para1}
            onChange={(event, editor) =>
              handleEditorChange("subtitle_para1", editor)
            }
          />

          <Typography>Subtitle Para 2</Typography>

          <CKEditor
            editor={ClassicEditor}
            data={formData.subtitle_para2}
            onChange={(event, editor) =>
              handleEditorChange("subtitle_para2", editor)
            }
          />

          <input type="file" onChange={handleFile} />

          {preview && (
            <img src={preview} className="h-20" alt="" />
          )}

          <Typography>Image BG</Typography>

          <input type="file" onChange={handleFileBg} />

          {previewBg && (
            <img src={previewBg} className="h-20" alt="" />
          )}

          <Button type="submit">
            Save
          </Button>

        </form>

      </Card>

    </div>

  );

}