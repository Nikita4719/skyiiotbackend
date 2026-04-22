const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../controllers/solutionTableIconsController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post(
  "/",
  upload.fields([
    { name: "icon1" }, { name: "icon2" }, { name: "icon3" },
    { name: "icon4" }, { name: "icon5" }, { name: "icon6" },
    { name: "icon7" }, { name: "icon8" }, { name: "icon9" },
    { name: "icon10" },
  ]),
  controller.create
);

router.put(
  "/:id",
  upload.fields([
    { name: "icon1" }, { name: "icon2" }, { name: "icon3" },
    { name: "icon4" }, { name: "icon5" }, { name: "icon6" },
    { name: "icon7" }, { name: "icon8" }, { name: "icon9" },
    { name: "icon10" },
  ]),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;