const prisma = require("../config/prisma");

/* CREATE */
exports.createMenu = async (req, res) => {
  const { name, link, order_no, is_button } = req.body;

  await prisma.navbar_menu.create({
    data: {
      name,
      link,
      order_no: Number(order_no),
      is_button: is_button === "true",
    },
  });

  res.json({ message: "Created" });
};

/* GET ALL */
exports.getMenus = async (req, res) => {
  const data = await prisma.navbar_menu.findMany({
    orderBy: { order_no: "asc" },
  });

  res.json(data);
};

/* GET ONE */
exports.getMenu = async (req, res) => {
  const id = parseInt(req.params.id);

  const data = await prisma.navbar_menu.findUnique({
    where: { id },
  });

  res.json(data);
};

/* UPDATE */
exports.updateMenu = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, link, order_no, is_button } = req.body;

  await prisma.navbar_menu.update({
    where: { id },
    data: {
      name,
      link,
      order_no: Number(order_no),
      is_button: is_button === "true",
    },
  });

  res.json({ message: "Updated" });
};

/* DELETE */
exports.deleteMenu = async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.navbar_menu.delete({
    where: { id },
  });

  res.json({ message: "Deleted" });
};