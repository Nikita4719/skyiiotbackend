const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const aboutController = require("../controllers/aboutController");

router.get("/", aboutController.getAll);
router.get("/:id", aboutController.getOne);

router.post(
  "/",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
  ]),
  aboutController.create
);

router.put(
  "/:id",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
  ]),
  aboutController.update
);

router.delete("/:id", aboutController.remove);

module.exports = router;
