const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  create,
  getAll,
  getOne,
  update,
  remove
} = require("../controllers/solutionSubCatController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "imagechart", maxCount: 1 },
    { name: "image2", maxCount: 20 }
  ]),
  create
);

router.put(
  "/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "imagechart", maxCount: 1 },
    { name: "image2", maxCount: 20 }
  ]),
  update
);

router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", remove);

module.exports = router;