import { Card, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";
import Editor from "@/pages/editor/editor";

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

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

      navigate("/dashboard/cms/footer");

    } catch (err) {
      console.error("Error saving footer:", err);

    }
  };

  const handleLinkChange = (index, newLink) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index].link = newLink;
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  return (
    <div className="mt-10 px-6">
      <Card className="w-full p-8 shadow-lg rounded-xl">

        <Typography variant="h4" className="mb-6">
          Footer Settings
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* ===== BASIC INFO (NOW SINGLE COLUMN) ===== */}
          <div className="flex flex-col gap-6">

            <div>
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

          </div>

          {/* ===== CONTENT ===== */}
          <div>
            <label className="text-sm font-medium">Content</label>

            <Editor
              value={formData.content}
              onChange={(val) => handleEditorChange("content", val)}
              height={300}
            />
          </div>

          {/* ===== LOGO ===== */}
          <div>
            <label className="text-sm font-medium">Logo</label>

            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo"
                className="w-28 h-28 object-cover border rounded mb-2"
              />
            )}

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
          </div>

          {/* ===== QR CODES (SAME LINE - NO CHANGE) ===== */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              QR Codes
            </label>

            <div className="grid grid-cols-4 gap-4">
              {formData.qr_codes.map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2">

                  {preview[index] && (
                    <img
                      src={preview[index]}
                      alt="QR"
                      className="w-20 h-20 object-cover border rounded"
                    />
                  )}

                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ===== LINKS ===== */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Links
            </label>

            <div className="flex flex-col gap-3">
              {formData.links.map((linkObj, index) => (
                <input
                  key={index}
                  type="text"
                  value={linkObj.link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  className="border p-2 rounded w-full"
                />
              ))}
            </div>
          </div>

          {/* ===== SUBMIT ===== */}
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>

        </form>
      </Card>
    </div>
  );
}