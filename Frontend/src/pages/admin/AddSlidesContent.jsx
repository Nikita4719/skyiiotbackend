import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";

export default function AddSlidesContent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    media: null,
  });

  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const handleEditorChange = (editor) => {
    const data = editor.getData();
    setFormData((prev) => ({
      ...prev,
      title: data,
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const type = file.type.startsWith("video") ? "video" : "image";

      setFormData((prev) => ({
        ...prev,
        media: file,
      }));

      setMediaType(type);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);


    navigate("../master/slides-content", { replace: true });
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10 px-6">
      <Card className="w-full max-w-5xl p-10 shadow-xl rounded-2xl">

        <Typography variant="h4" className="mb-2">
          Add Slide
        </Typography>

        <Typography variant="small" color="gray" className="mb-8">
          Create New Slide Content
        </Typography>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">

          {/* Title */}
          <div className="col-span-12">
            <Typography variant="small" className="mb-2 font-medium">
              Title
            </Typography>

            <div className="border rounded-xl p-2 bg-white">
              <CKEditor
                editor={ClassicEditor}
                data={formData.title}
                onChange={(event, editor) =>
                  handleEditorChange(editor)
                }
              />
            </div>
          </div>


          <div className="col-span-12">
            <Typography variant="small" className="mb-2 font-medium">
              Upload Image or Video
            </Typography>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition overflow-hidden">

              {preview ? (
                mediaType === "video" ? (
                  <video
                    src={preview}
                    controls
                    className="h-full object-contain rounded-xl"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full object-cover rounded-xl"
                  />
                )
              ) : (
                <Typography color="gray">
                  Click to upload image or video
                </Typography>
              )}

              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="col-span-12 flex gap-4">
            <Button type="submit">
              Save
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/admin/slides-content")}
            >
              Cancel
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}
