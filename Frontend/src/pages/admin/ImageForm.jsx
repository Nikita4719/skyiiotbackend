import {
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//export default function ImageForm() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
  title: "",
  content: "",
  image1: null,
});

const [preview, setPreview] = useState({
  image1: null,
});

const handleEditorChange = (field, editor) => {
  const data = editor.getData();
  setFormData((prev) => ({
    ...prev,
    [field]: data,
  }));
};

const handleImageChange = (e) => {
  const { name, files } = e.target;
  const file = files[0];

  if (file) {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    setPreview((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(file),
    }));
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  console.log(formData);


  navigate("/dashboard/master/image");
};

return (
  <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10 px-6">
    <Card className="w-full max-w-6xl p-10 shadow-xl rounded-2xl">
      <Typography variant="h4" className="mb-2">
        Add Image
      </Typography>

      <Typography variant="small" color="gray" className="mb-8">
        Manage Image Page
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
                handleEditorChange("title", editor)
              }
            />
          </div>
        </div>


        <div className="col-span-12">
          <Typography variant="small" className="mb-2 font-medium">
            Content
          </Typography>
          <div className="border rounded-xl p-2 bg-white">
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={(event, editor) =>
                handleEditorChange("content", editor)
              }
            />
          </div>
        </div>


        <div className="col-span-12">
          <Typography variant="small" className="mb-2 font-medium">
            Image
          </Typography>

          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition overflow-hidden">
            {preview.image1 ? (
              <img
                src={preview.image1}
                alt="Preview"
                className="h-full object-cover rounded-xl"
              />
            ) : (
              <Typography color="gray">
                Click to upload image
              </Typography>
            )}

            <input
              type="file"
              name="image1"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>


        <div className="col-span-12 flex gap-4">
          <Button type="submit" fullWidth>
            Save Changes
          </Button>

          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={() =>
              navigate("/dashboard/master/image")
            }
          >
            Cancel
          </Button>
        </div>

      </form>
    </Card>
  </div>
);
}
