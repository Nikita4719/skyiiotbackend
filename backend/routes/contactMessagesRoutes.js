const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactMessagesController");

router.post("/", controller.createMessage);

router.put("/:id", controller.updateMessage);

router.get("/", controller.getMessages);

router.get("/:id", controller.getMessageById);      

router.delete("/:id", controller.deleteMessage);

module.exports = router;