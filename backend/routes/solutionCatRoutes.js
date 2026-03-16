const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../controllers/solutionCatController");

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= ROUTES ================= */

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 }
  ]),
  controller.create
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 }
  ]),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;