const express = require("express");
const router = express.Router();

const {
  createContactSettings,
  getContactSettings,
  getSingleContactSettings, // ✅ ADD
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

// CREATE
router.post("/contact-settings", upload.single("bg_image"), createContactSettings);

// GET ALL
router.get("/contact-settings", getContactSettings);

// ✅ GET SINGLE (VERY IMPORTANT)
router.get("/contact-settings/:id", getSingleContactSettings);

// UPDATE
router.put("/contact-settings/:id", upload.single("bg_image"), updateContactSettings);

// DELETE
router.delete("/contact-settings/:id", deleteContactSettings);

module.exports = router;