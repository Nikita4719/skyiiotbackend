const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/aiPoweredController");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post(
  "/",
  upload.single("media"),
  controller.create
);

router.put(
  "/:id",
  upload.single("media"),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;
