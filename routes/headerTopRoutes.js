const express = require("express");
const router = express.Router();

const {
  getHeader,
  updateHeader,
} = require("../controllers/headerTopController");

router.get("/", getHeader);
router.post("/", updateHeader);

module.exports = router;