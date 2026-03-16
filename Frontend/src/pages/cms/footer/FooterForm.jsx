import { Card, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";


export default function FooterForm() {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
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

  // Fetch existing footer data
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/footer`)
      .then((res) => {
        const data = res.data || {};
        const qr = data.qr_code ? JSON.parse(data.qr_code) : ["", "", "", ""];
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
          data.logo ? `${BASE_URL}/uploads/qrcodes/${data.logo}` : ""
        );

        setPreview(
          qr.map((img) =>
            img ? `${BASE_URL}/uploads/qrcodes/${img}` : ""
          )
        );
      })
      .catch((err) => console.error("Error fetching footer:", err));

  }, []);

  // Handle text/textarea inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  // Handle QR image selection
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedQr = [...formData.qr_codes];
      updatedQr[index] = file;
      setFormData((prev) => ({ ...prev, qr_codes: updatedQr }));

      const updatedPreview = [...preview];
      updatedPreview[index] = URL.createObjectURL(file);
      setPreview(updatedPreview);
    }
  };

  // Submit form
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

      // QR codes
      formData.qr_codes.forEach((qr) => {
        if (qr instanceof File) {
          dataToSend.append("qr_codes", qr);
        }
      });

      // links
      dataToSend.append("links", JSON.stringify(formData.links));


      await axios.put(`${BASE_URL}/api/footer`, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Footer saved successfully!");
      navigate("/dashboard/cms/footer");

    } catch (err) {
      console.error("Error saving footer:", err);
      alert("Error saving footer. Check console.");
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
        <Typography variant="small" color="gray" className="mb-8">
          Manage Footer Section
        </Typography>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">
          {/* Title */}
          <div className="col-span-12">
            <Typography className="mb-2 font-medium">Title</Typography>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-xl p-2 w-full"
            />
          </div>

          {/* Content */}
          <div className="col-span-12">
            <Typography className="mb-2 font-medium">Content</Typography>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="border rounded-xl p-2 w-full"
              rows={4}
            />
          </div>

          {/* Contact Email */}
          <div className="col-span-12 md:col-span-6">
            <Typography className="mb-2 font-medium">Email</Typography>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className="border rounded-xl p-2 w-full"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            />
          </div>

          {/* Contact Phone */}
          <div className="col-span-12 md:col-span-6">
            <Typography className="mb-2 font-medium">Phone</Typography>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="border rounded-xl p-2 w-full"
              required
              pattern="(\+91[-\s]?)?[0-9]{10}"
              maxLength={14}
            />
          </div>

          {/* Address */}
          <div className="col-span-12">
            <Typography className="mb-2 font-medium">Address</Typography>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-xl p-2 w-full"
              rows={3}
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <Typography className="mb-2 font-medium">Logo</Typography>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition overflow-hidden">

              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="h-full object-cover rounded-xl"
                />
              ) : (
                <Typography color="gray">Click to upload Logo</Typography>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setLogo(file);
                    setLogoPreview(URL.createObjectURL(file));
                  }
                }}
              />

            </label>
          </div>

          {/* QR Codes */}
          {formData.qr_codes.map((qr, index) => (
            <div key={index} className="col-span-12 md:col-span-3">
              <Typography className="mb-2 font-medium">QR Code {index + 1}</Typography>
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition overflow-hidden">
                {preview[index] ? (
                  <img
                    src={preview[index]}
                    alt={`QR ${index + 1}`}
                    className="h-full object-cover rounded-xl"
                  />
                ) : (
                  <Typography color="gray">Click to upload QR {index + 1}</Typography>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="hidden"
                />
              </label>
            </div>
          ))}

          {/* Links */}
          <div className="col-span-12">
            <Typography className="mb-2 font-medium">Links (Solution URLs)</Typography>
            {formData.links.map((linkObj, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={linkObj.name}
                  readOnly
                  className="border rounded-xl p-2 w-1/3 bg-gray-100"
                />
                <input
                  type="text"
                  value={linkObj.link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  className="border rounded-xl p-2 w-2/3"
                />
              </div>
            ))}
          </div>


          <div className="col-span-12">
            <Button type="submit" fullWidth>
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}