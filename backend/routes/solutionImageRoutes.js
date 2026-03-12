const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createSolutionImage,
  getAllSolutionImages,
  getSingleSolutionImage,
  updateSolutionImage,
  deleteSolutionImage,
} = require("../controllers/solutionImageController");

const cpUpload = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]);

router.post("/", cpUpload, createSolutionImage);
router.get("/", getAllSolutionImages);
router.get("/:id", getSingleSolutionImage);
router.put("/:id", cpUpload, updateSolutionImage);
router.delete("/:id", deleteSolutionImage);

module.exports = router;
