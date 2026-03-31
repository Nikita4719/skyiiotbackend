import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";
import Editor from "@/pages/editor/editor";

export default function AIPoweredForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    heading1: "",
    heading2: "",
    heading3: "",
    paragraph1: "",
    paragraph2: "",
    media: null,
  });

  const [preview, setPreview] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/ai-powered/${id}`)
        .then((res) => {
          setFormData(res.data);

          if (res.data.media) {
            const fileUrl = `${BASE_URL}/${res.data.media}`;
            setPreview(fileUrl);

            // detect video from extension
            if (
              res.data.media.endsWith(".mp4") ||
              res.data.media.endsWith(".mov") ||
              res.data.media.endsWith(".avi") ||
              res.data.media.endsWith(".webm")
            ) {
              setIsVideo(true);
            } else {
              setIsVideo(false);
            }
          }
        });
    }
  }, [id]);

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      media: file,
    }));

    setPreview(URL.createObjectURL(file));

    if (file.type.startsWith("video")) {
      setIsVideo(true);
    } else {
      setIsVideo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("heading1", formData.heading1 || "");
    data.append("heading2", formData.heading2 || "");
    data.append("heading3", formData.heading3 || "");
    data.append("paragraph1", formData.paragraph1 || "");
    data.append("paragraph2", formData.paragraph2 || "");

    if (formData.media instanceof File) {
      data.append("media", formData.media);
    }

    if (id) {
      await axios.put(
        `${BASE_URL}/api/ai-powered/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      await axios.post(
        `${BASE_URL}/api/ai-powered`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    navigate("/dashboard/cms/ai-powered");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          <Typography>Heading 1</Typography>
          <Editor
            value={formData.heading1}
            onChange={(val) => handleEditorChange("heading1", val)}
            height={300}
          />


          <Typography>Heading 2</Typography>
          <Editor
            value={formData.heading2}
            onChange={(val) => handleEditorChange("heading2", val)}
            height={300}
          />

          <Typography>Heading 3</Typography>
          <Editor
            value={formData.heading3}
            onChange={(val) => handleEditorChange("heading3", val)}
            height={300}
          />

          <Typography>Paragraph 1</Typography>
          <Editor
            value={formData.paragraph1}
            onChange={(val) => handleEditorChange("paragraph1", val)}
            height={300}
          />

          <Typography>Paragraph 2</Typography>
          <Editor
            value={formData.paragraph2}
            onChange={(val) => handleEditorChange("paragraph2", val)}
            height={300}
          />
          <Typography>Image / Video</Typography>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
          />

          {preview && (
            <div className="mt-3">
              {isVideo ? (
                <video
                  src={preview}
                  className="h-20 rounded-lg"
                  controls
                />
              ) : (
                <img
                  src={preview}
                  className="h-20 rounded-lg"
                  alt=""
                />
              )}
            </div>
          )}

          <Button type="submit" fullWidth>
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
}