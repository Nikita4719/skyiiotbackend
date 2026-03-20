import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../configs/api";

export default function SolutionSubCat() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${BASE_URL}/api/solution-sub-cat`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${BASE_URL}/api/solution-sub-cat/${id}`);
      fetchData();
    }
  };

  /* ======================= */
  /* STRIP HTML TAGS */
  /* ======================= */
  const stripHtml = (value) => {
    if (!value || typeof value !== "string") return "";
    return value
      .replace(/<[^>]*>/g, "")   // remove HTML tags
      .replace(/&nbsp;/g, " ")   // fix spaces
      .trim();
  };

  /* ======================= */
  /* TRUNCATE TEXT */
  /* ======================= */
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";

    const cleanText = stripHtml(text); // ✅ clean text first

    return cleanText.length > maxLength
      ? cleanText.substring(0, maxLength) + "..."
      : cleanText;
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <div className="flex justify-between mb-6">
        <Typography variant="h4">
          Solution Sub Categories
        </Typography>

        <Button
          onClick={() =>
            navigate("/dashboard/solution/solution-sub-cat/add")
          }
        >
          Add New
        </Button>
      </div>

      <Card>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left border">

            <thead>
              <tr className="border-b border-blue-gray-200 bg-gray-100">
                <th className="border border-blue-gray-200 px-3 py-2">#</th>
                <th className="border border-blue-gray-200 px-3 py-2">Category</th>
                <th className="border border-blue-gray-200 px-3 py-2">Heading</th>
                <th className="border border-blue-gray-200 px-3 py-2">Image1</th>
                <th className="border border-blue-gray-200 px-3 py-2">Image Chart</th>
                <th className="border border-blue-gray-200 px-3 py-2">Description1</th>
                <th className="border border-blue-gray-200 px-3 py-2">Description2</th>
                <th className="border border-blue-gray-200 px-3 py-2">Para1</th>
                <th className="border border-blue-gray-200 px-3 py-2">Para2</th>
                <th className="border border-blue-gray-200 px-3 py-2">Para3</th>
                <th className="border border-blue-gray-200 px-3 py-2">Para4</th>
                <th className="border border-blue-gray-200 px-3 py-2">Image2</th>
                <th className="border border-blue-gray-200 px-3 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => {

                let images = [];

                try {
                  images =
                    typeof item.image2 === "string"
                      ? JSON.parse(item.image2)
                      : item.image2 || [];
                } catch {
                  images = [];
                }

                return (
                  <tr key={item.id} className="border-b">

                    <td className="border border-blue-gray-200 p-3">
                      {index + 1}
                    </td>

                    <td className="border border-blue-gray-200 p-3 font-semibold">
                      {item.solution_cat?.title || "No Category"}
                    </td>

                    <td className="border border-blue-gray-200 p-3">
                      {truncateText(item.heading)}
                    </td>

                    <td className="border border-blue-gray-200 p-3">
                      {item.image1 ? (
                        <img
                          src={`${BASE_URL}/${item.image1}`}
                          className="h-14 rounded"
                          alt="image1"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td className="border border-blue-gray-200 p-3">
                      {item.imagechart ? (
                        <img
                          src={`${BASE_URL}/${item.imagechart}`}
                          className="h-14 rounded"
                          alt="chart"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td className="border border-blue-gray-200 p-3 max-w-xs">
                      {truncateText(item.description1)}
                    </td>

                    <td className="border border-blue-gray-200 p-3 max-w-xs">
                      {truncateText(item.description2)}
                    </td>

                    <td className="border border-blue-gray-200 p-3 max-w-xs">
                      {truncateText(item.para1)}
                    </td>

                    <td className="border border-blue-gray-200 p-3 max-w-xs">
                      {truncateText(item.para2)}
                    </td>

                    <td className="border border-blue-gray-200 p-3 max-w-xs">
                      {truncateText(item.para3)}
                    </td>

                    <td className="border border-blue-gray-200 p-3 max-w-xs">
                      {truncateText(item.para4)}
                    </td>

                    <td className="border border-blue-gray-200 p-3">
                      <div className="flex gap-2 flex-wrap">
                        {images.length > 0
                          ? images.map((img, i) => (
                              <img
                                key={i}
                                src={`${BASE_URL}/${img}`}
                                className="h-12 rounded"
                                alt="multi"
                              />
                            ))
                          : "No Image"}
                      </div>
                    </td>

                    <td className="border border-blue-gray-200 p-3 space-x-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/dashboard/solution/solution-sub-cat/edit/${item.id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </td>

                  </tr>
                );
              })}

              {data.length === 0 && (
                <tr>
                  <td colSpan="12" className="text-center p-6">
                    No Data Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </CardBody>
      </Card>
    </div>
  );
}