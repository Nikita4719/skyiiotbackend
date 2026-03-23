const prisma = require("../config/prisma");

//SLUGIFY
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/\s+/g, "-");


//READ
exports.getFooter = async (req, res) => {
  try {
    const footer = await prisma.footer.findFirst();

    if (!footer) {
      return res.json({});
    }

    let links = footer.links;


    if (!links && footer.content) {
      links = footer.content.split(/\r?\n/).map((item) => ({
        name: item.trim(),
        link: `/solutions/${slugify(item.trim())}`,
      }));
    }

    res.json({
      ...footer,
      links,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch footer" });
  }
};


//UPDATE
exports.updateFooter = async (req, res) => {
  try {
    const {
      title,
      content,
      contact_email,
      contact_phone,
      address,
      links,
    } = req.body;

    let footer = await prisma.footer.findFirst();

    let logo = footer?.logo ?? null;

    if (req.files?.logo && req.files.logo.length > 0) {
      logo = req.files.logo[0].filename;
    }

    const qrFiles = req.files?.qr_codes || [];

    let existingQr = footer?.qr_code
      ? JSON.parse(footer.qr_code)
      : ["", "", "", ""];

    qrFiles.forEach((file, index) => {
      existingQr[index] = file.filename;
    });

    const qr_code = JSON.stringify(existingQr);

    let parsedLinks = [];

    if (links) {
      try {
        parsedLinks = JSON.parse(links);
      } catch {
        parsedLinks = [];
      }
    }

    const data = {
      title: title ?? footer?.title ?? null,
      content: content ?? footer?.content ?? null,
      contact_email: contact_email ?? footer?.contact_email ?? null,
      contact_phone: contact_phone ?? footer?.contact_phone ?? null,
      address: address ?? footer?.address ?? null,
      logo,
      qr_code,
      links: parsedLinks,
    };

    if (footer) {
      footer = await prisma.footer.update({
        where: { id: footer.id },
        data,
      });
    } else {
      footer = await prisma.footer.create({ data });
    }

    res.json({
      message: "Footer saved successfully",
      data: footer,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save footer" });
  }
};


//DELETE
exports.deleteFooter = async (req, res) => {
  try {
    const footer = await prisma.footer.findFirst();

    if (!footer) {
      return res.status(404).json({
        message: "No footer found",
      });
    }

    await prisma.footer.delete({
      where: { id: footer.id },
    });

    res.json({
      message: "Footer deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete footer" });
  }
};

