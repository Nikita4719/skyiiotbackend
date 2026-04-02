const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/ourTeamController");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post(
  "/",
  upload.fields([{ name: "image" }]),
  controller.create
);

router.put(
  "/:id",
  upload.fields([{ name: "image" }]),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;
