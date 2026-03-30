import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//export default function FaqsForm() {
const navigate = useNavigate();
const { id } = useParams();

const [formData, setFormData] = useState({
  title: "",
});

const handleEditorChange = (editor) => {
  const data = editor.getData();
  setFormData({ title: data });
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);

  navigate("/dashboard/master/faqs");
};

return (
  <div className="mt-12 mb-8 px-6">
    <Card className="w-full p-10 shadow-xl rounded-2xl">

      <Typography variant="h4" className="mb-2">
        {id ? "Edit FAQ" : "Add FAQ"}
      </Typography>

      <Typography variant="small" color="gray" className="mb-8">
        Manage FAQ Section
      </Typography>

      <form onSubmit={handleSubmit}>

        <Typography className="mb-2 font-medium">
          Title
        </Typography>

        <div className="border rounded-xl p-2 bg-white mb-6">
          <CKEditor
            editor={ClassicEditor}
            data={formData.title}
            config={{
              toolbar: [
                "bold",
                "italic",
                "underline",
                "|",
                "link",
                "|",
                "undo",
                "redo",
              ],
            }}
            onChange={(event, editor) =>
              handleEditorChange(editor)
            }
          />
        </div>

        <Button type="submit" fullWidth>
          Save
        </Button>

      </form>
    </Card>
  </div>
);
}
