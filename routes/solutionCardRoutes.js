const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../controllers/solutionCardController");

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
    { name: "svg1", maxCount: 1 },
    { name: "svg2", maxCount: 1 },
    { name: "svg3", maxCount: 1 },
    { name: "svg4", maxCount: 1 },
    { name: "svg5", maxCount: 1 },
    { name: "svg6", maxCount: 1 },
  ]),
  controller.create
);

router.put(
  "/:id",
  upload.fields([
    { name: "svg1", maxCount: 1 },
    { name: "svg2", maxCount: 1 },
    { name: "svg3", maxCount: 1 },
    { name: "svg4", maxCount: 1 },
    { name: "svg5", maxCount: 1 },
    { name: "svg6", maxCount: 1 },
  ]),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;