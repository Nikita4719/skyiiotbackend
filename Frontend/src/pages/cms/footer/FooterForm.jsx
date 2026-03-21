import { Card, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function FooterForm() {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  // const [id, setId] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    qr_codes: ["", "", "", ""],
    links: [],
  });

  const [preview, setPreview] = useState(["", "", "", ""]);

  // ================= FETCH DATA =================
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/footer`)
      .then((res) => {
       
        const data = res.data || {};

        const qr = data.qr_code
          ? JSON.parse(data.qr_code)
          : ["", "", "", ""];

        setFormData({
          title: data.title || "",
          content: data.content || "",
          contact_email: data.contact_email || "",
          contact_phone: data.contact_phone || "",
          address: data.address || "",
          qr_codes: qr,
          links: data.links || [],
        });

       setLogoPreview(
  data.logo ? `${BASE_URL}/uploads/${data.logo}` : "" // ✅ FIX
);

        setPreview(
  qr.map((img) =>
    img ? `${BASE_URL}/uploads/qrcodes/${img}` : ""
  )
);
      })
      .catch((err) => console.error("Error fetching footer:", err));
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  // ================= HANDLE IMAGE =================
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedQr = [...formData.qr_codes];
      updatedQr[index] = file;

      setFormData((prev) => ({
        ...prev,
        qr_codes: updatedQr,
      }));

      const updatedPreview = [...preview];
      updatedPreview[index] = URL.createObjectURL(file);

      setPreview(updatedPreview);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = new FormData();

      dataToSend.append("title", formData.title || "");
      dataToSend.append("content", formData.content || "");
      dataToSend.append("contact_email", formData.contact_email || "");
      dataToSend.append("contact_phone", formData.contact_phone || "");
      dataToSend.append("address", formData.address || "");

      if (logo) {
        dataToSend.append("logo", logo);
      }

      formData.qr_codes.forEach((qr) => {
        if (qr instanceof File) {
          dataToSend.append("qr_codes", qr);
        }
      });

      dataToSend.append("links", JSON.stringify(formData.links));

      await axios.put(`${BASE_URL}/api/footer`, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Footer saved successfully!");
      navigate("/dashboard/cms/footer");

    } catch (err) {
      console.error("Error saving footer:", err);
      alert("Error saving footer");
    }
  };

  const handleLinkChange = (index, newLink) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index].link = newLink;
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10 shadow-xl rounded-2xl">
        <Typography variant="h4" className="mb-2">
          Edit Footer
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded"
          />

          {/* Content */}
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            className="border p-2 rounded"
          />

          {/* Email */}
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
          />

          {/* Phone */}
          <input
            type="text"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded"
          />

          {/* Address */}
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 rounded"
          />

          {/* Logo */}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setLogo(file);
                setLogoPreview(URL.createObjectURL(file));
              }
            }}
          />

          {/* QR Codes */}
          <div className="grid grid-cols-4 gap-4">
            {formData.qr_codes.map((qr, index) => (
              <input
                key={index}
                type="file"
                onChange={(e) => handleImageChange(e, index)}
              />
            ))}
          </div>

          {/* Links */}
          {formData.links.map((linkObj, index) => (
            <input
              key={index}
              type="text"
              value={linkObj.link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              className="border p-2 rounded"
            />
          ))}

          <Button type="submit">Save</Button>

        </form>
      </Card>
    </div>
  );
}