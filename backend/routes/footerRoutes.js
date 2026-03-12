// routes/footerRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getFooter, updateFooter, deleteFooter } = require("../controllers/footerController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/qrcodes/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", getFooter);
router.put("/", upload.array("qr_codes", 4), updateFooter);
router.delete("/", deleteFooter);

module.exports = router;