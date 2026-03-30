import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//export default function OfferSectionForm() {
const navigate = useNavigate();
const { id } = useParams();

const [formData, setFormData] = useState({
  title: "",
  content: "",
  image1: null,
  image2: null,
});

const [preview, setPreview] = useState({
  image1: null,
  image2: null,
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

  // Go back to list page
  navigate("/dashboard/master/offer-section");
};

return (
  <div className="mt-12 mb-8 px-6">
    <Card className="w-full p-10 shadow-xl rounded-2xl">

      <Typography variant="h4" className="mb-2">
        {id ? "Edit Offer Section" : "Add Offer Section"}
      </Typography>

      <Typography variant="small" color="gray" className="mb-8">
        Manage Offer Section
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

        {/* Image 1 */}
        <div className="col-span-12 md:col-span-6">
          <Typography className="mb-2 font-medium">
            Image 1
          </Typography>
          <input
            type="file"
            name="image1"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Image 2 */}
        <div className="col-span-12 md:col-span-6">
          <Typography className="mb-2 font-medium">
            Image 2
          </Typography>
          <input
            type="file"
            name="image2"
            accept="image/*"
            onChange={handleImageChange}
          />
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
