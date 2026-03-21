// routes/footerRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getFooter,
  updateFooter,
  deleteFooter,
} = require("../controllers/footerController");


/* =============================
   MULTER STORAGE
============================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/qrcodes/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });



/* =============================
   ROUTES
============================= */

// get footer
router.get("/", getFooter);


// update footer (logo + qr codes)
router.put(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "qr_codes", maxCount: 4 },
  ]),
  updateFooter
);


// delete footer
router.delete("/", deleteFooter);


module.exports = router;