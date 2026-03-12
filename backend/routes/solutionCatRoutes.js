const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createSolutionCat,
  getAllSolutionCat,
  getSingleSolutionCat,
  updateSolutionCat,
  deleteSolutionCat,
} = require("../controllers/solutionCatController");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createSolutionCat);
router.get("/", getAllSolutionCat);
router.get("/:id", getSingleSolutionCat);
router.put("/:id", upload.single("image"), updateSolutionCat);
router.delete("/:id", deleteSolutionCat);

module.exports = router;
