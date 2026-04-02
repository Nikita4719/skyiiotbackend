const express = require("express");
const router = express.Router();
const controller = require("../controllers/aboutUsEnterpriseController");
const upload = require("../middleware/upload");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  controller.create
);

router.put(
  "/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;
