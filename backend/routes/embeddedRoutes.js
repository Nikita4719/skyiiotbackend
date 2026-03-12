const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/embeddedController");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post(
  "/",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
    { name: "image3" },
    { name: "image4" },
    { name: "video" },
  ]),
  controller.create
);

router.put(
  "/:id",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
    { name: "image3" },
    { name: "image4" },
    { name: "video" },
  ]),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;