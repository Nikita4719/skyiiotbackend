const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/solutionSubCatController");

// =============================
// Multer Config
// =============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =============================
// Routes
// =============================
router.post("/", upload.array("image2"), create);
router.put("/:id", upload.array("image2"), update);

router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", remove);

module.exports = router;
