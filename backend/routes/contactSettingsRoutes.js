const express = require("express");
const router = express.Router();

const {
  createContactSettings,
  getContactSettings,
//   getSingleContactSettings,
  updateContactSettings,
  deleteContactSettings
} = require("../controllers/contactSettingsController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// routes
router.post("/contact-settings", upload.single("bg_image"), createContactSettings);

router.get("/contact-settings", getContactSettings);
// router.get("/contact-settings/:id", getSingleContactSettings);

router.put("/contact-settings/:id", upload.single("bg_image"), updateContactSettings);

router.delete("/contact-settings/:id", deleteContactSettings);

module.exports = router;