import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function EmbeddedSectionForm() {
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
    video: null,
  });

  const [preview, setPreview] = useState({});


  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/embeddedsection/${id}`)
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
            video: null,
          });

          setPreview({
            image1: data.image1
              ? `${BASE_URL}/${data.image1}`
              : null,
            image2: data.image2
              ? `${BASE_URL}/${data.image2}`
              : null,
            image3: data.image3
              ? `${BASE_URL}/${data.image3}`
              : null,
            image4: data.image4
              ? `${BASE_URL}/${data.image4}`
              : null,
            video: data.video
              ? `${BASE_URL}/${data.video}`
              : null,
          });
        });
    }
  }, [id]);

  // CKEDITOR 
  const handleEditorChange = (field, editor) => {
    setFormData((prev) => ({
      ...prev,
      [field]: editor.getData(),
    }));
  };

  /* FILE CHANGE  */

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    setPreview((prev) => ({
      ...prev,
      [name]: {
        url: URL.createObjectURL(file),
        type: file.type,
      },
    }));
  };

  // SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (id) {
      await axios.put(
        `${BASE_URL}/api/embeddedsection/${id}`,
        data
      );
    } else {
      await axios.post(
        `${BASE_URL}/api/embeddedsection`,
        data
      );
    }

    navigate("/dashboard/master/embedded-section");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Heading */}
          <Typography>Heading</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={formData.heading}
            onChange={(e, editor) =>
              handleEditorChange("heading", editor)
            }
          />

          {/* Paragraph 1 */}
          <Typography>Paragraph 1</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={formData.paragraph1}
            onChange={(e, editor) =>
              handleEditorChange("paragraph1", editor)
            }
          />

          {/* Paragraph 2 */}
          <Typography>Paragraph 2</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={formData.paragraph2}
            onChange={(e, editor) =>
              handleEditorChange("paragraph2", editor)
            }
          />

          {/* Images */}
          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <Typography>Image {num}</Typography>
              <input
                type="file"
                name={`image${num}`}
                accept="image/*"
                onChange={handleFileChange}
              />

              {preview[`image${num}`] && (
                <img
                  src={
                    preview[`image${num}`].url ||
                    preview[`image${num}`]
                  }
                  className="h-20 mt-2"
                  alt=""
                />
              )}
            </div>
          ))}

          {/* MEDIA (Image + Video) */}
          <Typography>Media (Image / Video)</Typography>
          <input
            type="file"
            name="video"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />

          {preview.video && (
            preview.video.type ? (
              preview.video.type.startsWith("video") ? (
                <video
                  src={preview.video.url}
                  className="h-24 mt-2"
                  controls
                />
              ) : (
                <img
                  src={preview.video.url}
                  className="h-24 mt-2"
                  alt=""
                />
              )
            ) : preview.video.endsWith(".mp4") ||
              preview.video.endsWith(".webm") ||
              preview.video.endsWith(".mov") ? (
              <video
                src={preview.video}
                className="h-24 mt-2"
                controls
              />
            ) : (
              <img
                src={preview.video}
                className="h-24 mt-2"
                alt=""
              />
            )
          )}

          <Button type="submit" fullWidth>
            Save
          </Button>

        </form>
      </Card>
    </div>
  );
}