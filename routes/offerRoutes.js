const express = require("express");
const router = express.Router();
const controller = require("../controllers/offerController");
const upload = require("../middleware/upload");

router.post(
  "/",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
  ]),
  controller.create
);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.put(
  "/:id",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
  ]),
  controller.update
);

router.delete("/:id", controller.delete);

module.exports = router;
