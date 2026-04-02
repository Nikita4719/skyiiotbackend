const prisma = require("../config/prisma");

exports.getLogo = async (req, res) => {
  const data = await prisma.navbar_logo.findFirst();
  res.json(data);
};

exports.updateLogo = async (req, res) => {
  const { logo_text, logo_tagline } = req.body;

  const existing = await prisma.navbar_logo.findFirst();

  let logo = existing?.logo;

  if (req.file) {
    logo = req.file.path.replace(/\\/g, "/");
  }

  if (existing) {
    await prisma.navbar_logo.update({
      where: { id: existing.id },
      data: { logo, logo_text, logo_tagline },
    });
  } else {
    await prisma.navbar_logo.create({
      data: { logo, logo_text, logo_tagline },
    });
  }

  res.json({ message: "Updated Successfully" });
};