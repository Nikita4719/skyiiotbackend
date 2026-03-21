import { Card, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../configs/api";

export default function ServicesCategoryForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [services, setServices] = useState([]);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({

    service_id: "",
    link: "",
    icon: null

  });

  useEffect(() => {

    axios.get(`${BASE_URL}/api/services`)
      .then(res => setServices(res.data));

    if (id) {

      axios.get(`${BASE_URL}/api/services-category/${id}`)
        .then(res => {

          const data = res.data;

          setFormData({

            service_id: data.service_id,
            link: data.link,
            icon: null

          });

          if (data.icon) {
            setPreview(`${BASE_URL}/${data.icon}`);
          }

        });

    }

  }, [id]);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleFile = (e) => {

    const file = e.target.files[0];

    setFormData({
      ...formData,
      icon: file
    });

    setPreview(URL.createObjectURL(file));

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
        `${BASE_URL}/api/services-category/${id}`,
        data
      );

    } else {

      await axios.post(
        `${BASE_URL}/api/services-category`,
        data
      );

    }

    navigate("/dashboard/master/services-category");

  };

  return (

    <div className="mt-12 px-6">

      <Card className="p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>

            <Typography>Service</Typography>

            <select
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              className="border p-2 w-full"
            >

              <option value="">Select Service</option>

              {services.map(item => (
                <option key={item.id} value={item.id}>
                  {stripHtml(item.title)}
                </option>
              ))}

            </select>

          </div>

          <div>

            <Typography>Link</Typography>

            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="border p-2 w-full"
            />

          </div>

          <div>

            <Typography>Icon</Typography>

            <input
              type="file"
              onChange={handleFile}
            />

            {preview && (

              <img
                src={preview}
                className="h-20 mt-3"
                alt=""
              />

            )}

          </div>

          <Button type="submit">
            Save
          </Button>

        </form>

      </Card>

    </div>

  );

}