const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/\s+/g, "-");



/* ==============================
   GET FOOTER
============================== */

exports.getFooter = async (req, res) => {
  try {
    const footer = await prisma.footer.findFirst();

    if (!footer) {
      return res.json({});
    }

    let links = footer.links;

    // fallback: generate links from content if links not present
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

  } catch (err) {
    console.error("GET FOOTER ERROR:", err);
    res.status(500).json({
      message: "Database error",
      error: err.message,
    });
  }
};



/* ==============================
   UPDATE / CREATE FOOTER
============================== */

exports.updateFooter = async (req, res) => {
  try {

    const {
      title,
      content,
      contact_email,
      contact_phone,
      address,
      links
    } = req.body;


    // find existing footer
    let footer = await prisma.footer.findFirst();


    /* ------------------------------
       HANDLE LOGO
    ------------------------------ */

    let logo;

    if (req.files?.logo && req.files.logo.length > 0) {
      logo = req.files.logo[0].filename;
    }


    /* ------------------------------
       HANDLE QR CODES
    ------------------------------ */

    const qrFiles = req.files?.qr_codes || [];

    // existing QR codes from DB
    let existingQr = footer?.qr_code
      ? JSON.parse(footer.qr_code)
      : ["", "", "", ""];

    // replace only uploaded indexes
    if (qrFiles.length > 0) {
      qrFiles.forEach((file, index) => {
        existingQr[index] = file.filename;
      });
    }

    const qr_code_json = JSON.stringify(existingQr);



    /* ------------------------------
       PARSE LINKS
    ------------------------------ */

    let parsedLinks = [];

    if (links) {
      try {
        parsedLinks = JSON.parse(links);
      } catch {
        parsedLinks = [];
      }
    }



    /* ------------------------------
       UPDATE OR CREATE
    ------------------------------ */

    if (footer) {

      footer = await prisma.footer.update({
        where: { id: footer.id },
        data: {
          title,
          content,
          contact_email,
          contact_phone,
          address,

          ...(logo && { logo }),

          qr_code: qr_code_json,
          links: parsedLinks,
        },
      });

    } else {

      footer = await prisma.footer.create({
        data: {
          title,
          content,
          contact_email,
          contact_phone,
          address,
          logo: logo || "",
          qr_code: qr_code_json,
          links: parsedLinks,
        },
      });

    }

    res.json({
      message: "Footer saved successfully",
      footer,
    });

  } catch (error) {
    console.error("UPDATE FOOTER ERROR:", error);

    res.status(500).json({
      error: "Footer update failed",
      message: error.message,
    });
  }
};



/* ==============================
   DELETE FOOTER
============================== */

exports.deleteFooter = async (req, res) => {
  try {

    const footer = await prisma.footer.findFirst();

    if (!footer) {
      return res.status(404).json({
        message: "No footer found to delete",
      });
    }

    await prisma.footer.delete({
      where: { id: footer.id },
    });

    res.json({
      message: "Footer deleted successfully",
    });

  } catch (err) {

    console.error("DELETE FOOTER ERROR:", err);

    res.status(500).json({
      message: "Database error",
      error: err.message,
    });
  }
};