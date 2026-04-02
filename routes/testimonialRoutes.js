const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createTestimonial,
  getAllTestimonials,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

const cpUpload = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
]);

router.post("/", cpUpload, createTestimonial);
router.get("/", getAllTestimonials);
router.get("/:id", getSingleTestimonial);
router.put("/:id", cpUpload, updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
