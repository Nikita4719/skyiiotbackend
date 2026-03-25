import {
  Card,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";


export default function AddSlidesContent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [media, setMedia] = useState(null);
  const [oldMedia, setOldMedia] = useState("");
  const [preview, setPreview] = useState("");


  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/api/slides/${id}`)
        .then((res) => {
          setTitle(res.data?.title || "");
          setOldMedia(res.data?.media || "");
        })
        .catch((err) => console.log(err));
    }
  }, [id]);




  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (media) formData.append("media", media);

    try {
      if (id) {
        await axios.put(`${BASE_URL}/api/slides/${id}`, formData);
      } else {
        await axios.post(`${BASE_URL}/api/slides`, formData);
      }

      navigate("/dashboard/master/slides-content");
    } catch (error) {
      console.error(error);
    }
  };

  const renderMedia = (src) => {
    if (!src) return null;

    const fullPath = `${BASE_URL}/${src}`;

    if (src.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video
          src={fullPath}
          width="220"
          controls
          className="rounded shadow"
        />
      );
    }

    return (
      <img
        src={fullPath}
        alt="media"
        width="220"
        className="rounded shadow object-cover"
      />
    );
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="p-8 shadow-lg">
        <Typography variant="h5" className="mb-6">
          {id ? "Edit Slide" : "Add Slide"}
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <Typography variant="small" className="mb-2">
              Title
            </Typography>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* MEDIA */}
          <div>
            <Typography variant="small" className="mb-2">
              Image / Video
            </Typography>

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
            />

            {/* NEW PREVIEW */}
            {preview && (
              <div className="mt-4">
                <Typography variant="small" className="mb-2">
                  New Preview
                </Typography>
                {renderMedia(preview)}
              </div>
            )}

            {/* OLD MEDIA */}
            {!preview && oldMedia && (
              <div className="mt-4">
                <Typography variant="small" className="mb-2">
                  Existing Media
                </Typography>
                {renderMedia(oldMedia)}
              </div>
            )}
          </div>

          {/* BUTTON */}
          <div className="flex gap-4">
            <Button type="submit">
              {id ? "Update Slide" : "Add Slide"}
            </Button>

            <Button
              color="gray"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}



