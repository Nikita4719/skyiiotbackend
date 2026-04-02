const express = require("express");
const router = express.Router();

const {
  createMenu,
  getMenus,
  getMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/navbarMenuController");

router.get("/", getMenus);
router.get("/:id", getMenu);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

module.exports = router;