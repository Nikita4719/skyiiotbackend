const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getLogo,
  updateLogo,
} = require("../controllers/navbarLogoController");

router.get("/", getLogo);

router.post(
  "/",
  upload.single("logo"),
  updateLogo
);

module.exports = router;