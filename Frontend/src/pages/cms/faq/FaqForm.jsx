import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";
import Editor from "@/pages/editor/editor";


export default function FaqForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    faq_id: "",
    para: "",
  });

  const [loading, setLoading] = useState(true);

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {

        const [faqRes, singleRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/faqs`),
          id
            ? axios.get(`${BASE_URL}/api/cms-faqs/${id}`)
            : Promise.resolve(null),
        ]);

        setFaqs(faqRes.data);

        if (singleRes) {
          setFormData({
            faq_id: String(singleRes.data.faq_id),
            para: singleRes.data.para || "",
          });
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await axios.put(
        `${BASE_URL}/api/cms-faqs/${id}`,
        formData
      );
    } else {
      await axios.post(
        `${BASE_URL}/api/cms-faqs`,
        formData
      );
    }

    navigate("/dashboard/cms/faq");
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title Dropdown */}
          <div>
            <Typography variant="small" className="mb-2 font-semibold">
              Select Title
            </Typography>

            <select
              value={formData.faq_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  faq_id: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select FAQ</option>

              {faqs.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {/* Paragraph */}
          {/* Paragraph */}
          <div>
            <Typography variant="small" className="mb-2 font-semibold">
              Paragraph
            </Typography>

            <Editor
              value={formData.para}
              onChange={(val) => handleEditorChange("para", val)}
              height={300}
            />
          </div>

          <Button type="submit" fullWidth>
            {id ? "Update" : "Add"}
          </Button>

        </form>
      </Card>
    </div>
  );
}