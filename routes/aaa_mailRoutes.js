const express = require("express");
const router = express.Router();

const contactFormController = require("../controllers/aaa_mailController");

router.post("/", contactFormController.submitForm);

module.exports = router;