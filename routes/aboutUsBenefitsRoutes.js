const express = require("express");
const router = express.Router();
const controller = require("../controllers/aboutUsBenefitsController");
const upload = require("../middleware/upload");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post(
  "/",
  upload.array("images", 10),
  controller.create
);

router.put(
  "/:id",
  upload.array("images", 10),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;
