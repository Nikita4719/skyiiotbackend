import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//export default function NetworkSectionForm() {
const navigate = useNavigate();
const { id } = useParams();

const [formData, setFormData] = useState({
  title: "",
  content: "",
  image1: null,
  image2: null,
  image3: null,
  image4: null,
});

const [preview, setPreview] = useState({
  image1: null,
  image2: null,
  image3: null,
  image4: null,
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


  navigate("/dashboard/master/network-section");
};

return (
  <div className="mt-12 mb-8 px-6">
    <Card className="w-full p-10 shadow-xl rounded-2xl">

      <Typography variant="h4" className="mb-2">
        {id ? "Edit Network Section" : "Add Network Section"}
      </Typography>

      <Typography variant="small" color="gray" className="mb-8">
        Manage Network Section
      </Typography>

      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">

        {/* Title */}
        <div className="col-span-12">
          <Typography className="mb-2 font-medium">
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

        {/* Content */}
        <div className="col-span-12">
          <Typography className="mb-2 font-medium">
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

        {/* Images */}
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="col-span-12 md:col-span-6">
            <Typography className="mb-2 font-medium">
              Image {num}
            </Typography>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition overflow-hidden">
              {preview[`image${num}`] ? (
                <img
                  src={preview[`image${num}`]}
                  alt={`Preview ${num}`}
                  className="h-full object-cover rounded-xl"
                />
              ) : (
                <Typography color="gray">
                  Click to upload image {num}
                </Typography>
              )}

              <input
                type="file"
                name={`image${num}`}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        ))}

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
