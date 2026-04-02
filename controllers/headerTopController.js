const prisma = require("../config/prisma");

exports.getHeader = async (req, res) => {
  const data = await prisma.header_top.findFirst();
  res.json(data);
};

exports.updateHeader = async (req, res) => {
  const { phone, email, facebook_link, twitter_link, linkedin_link, youtube_link } = req.body;

  const existing = await prisma.header_top.findFirst();

  if (existing) {
    await prisma.header_top.update({
      where: { id: existing.id },
      data: { phone, email, facebook_link, twitter_link, linkedin_link, youtube_link },
    });
  } else {
    await prisma.header_top.create({
      data: { phone, email, facebook_link, twitter_link, linkedin_link, youtube_link },
    });
  }

  res.json({ message: "Updated Successfully" });
};