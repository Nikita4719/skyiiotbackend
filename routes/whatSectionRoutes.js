const express = require("express");
const router = express.Router();
const controller = require("../controllers/whatSectionController");
const upload = require("../middleware/upload");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post("/", upload.single("image"), controller.create);

router.put("/:id", upload.single("image"), controller.update);

router.delete("/:id", controller.remove);

module.exports = router;