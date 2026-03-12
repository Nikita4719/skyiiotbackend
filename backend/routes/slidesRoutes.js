const express = require("express");
const router = express.Router();
const slidesController = require("../controllers/slidesController");
const upload = require("../middleware/upload");

router.get("/", slidesController.getAll);
router.get("/:id", slidesController.getOne);

router.post("/", upload.single("media"), slidesController.create);

router.put("/:id", upload.single("media"), slidesController.update);

router.delete("/:id", slidesController.remove);

module.exports = router;