const express = require("express");
const router = express.Router();

const {
  createContactSettings,
  getContactSettings,
  getSingleContactSettings, 
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

router.post("/", upload.single("bg_image"), createContactSettings);

router.get("/", getContactSettings);

router.get("/:id", getSingleContactSettings);

router.put("/:id", upload.single("bg_image"), updateContactSettings);

router.delete("/:id", deleteContactSettings);

module.exports = router;