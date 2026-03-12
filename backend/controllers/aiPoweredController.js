const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "../"); // ✅ correct path

/* ======================= */
/* HELPER: STRIP HTML */
/* ======================= */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return null;

  const clean = value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.length ? clean : null;
};

/* ======================= */
/* HELPER: DELETE FILE */
/* ======================= */
const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  const fullPath = path.join(ROOT_DIR, filePathFromDb);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error("Error deleting file:", err.message);
    }
  }
};

/* ======================= */
/* GET ALL */
/* ======================= */
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.ai_powered.findMany({
      orderBy: { id: "desc" },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* ======================= */
/* GET ONE */
/* ======================= */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const record = await prisma.ai_powered.findUnique({
      where: { id },
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* ======================= */
/* CREATE */
/* ======================= */
exports.create = async (req, res) => {
  try {
    const cleanHeading1 = stripHtml(req.body.heading1);
    const cleanHeading2 = stripHtml(req.body.heading2);
    const cleanHeading3 = stripHtml(req.body.heading3);
    const cleanParagraph1 = stripHtml(req.body.paragraph1);
    const cleanParagraph2 = stripHtml(req.body.paragraph2);

    if (!cleanHeading1 || !cleanParagraph1) {
      return res
        .status(400)
        .json({ message: "Heading1 and Paragraph1 are required" });
    }

    let media = null;

    if (req.file) {
      media = `uploads/${req.file.filename}`; // ✅ FIXED
    }

    await prisma.ai_powered.create({
      data: {
        heading1: cleanHeading1,
        heading2: cleanHeading2,
        heading3: cleanHeading3,
        paragraph1: cleanParagraph1,
        paragraph2: cleanParagraph2,
        media,
      },
    });

    res.status(201).json({ message: "Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

/* ======================= */
/* UPDATE */
/* ======================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const existing = await prisma.ai_powered.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    let media = existing.media;

    if (req.file) {
      // delete old file
      deleteFile(existing.media);

      media = `uploads/${req.file.filename}`; // ✅ FIXED
    }

    await prisma.ai_powered.update({
      where: { id },
      data: {
        heading1:
          stripHtml(req.body.heading1) ?? existing.heading1,
        heading2:
          stripHtml(req.body.heading2) ?? existing.heading2,
        heading3:
          stripHtml(req.body.heading3) ?? existing.heading3,
        paragraph1:
          stripHtml(req.body.paragraph1) ?? existing.paragraph1,
        paragraph2:
          stripHtml(req.body.paragraph2) ?? existing.paragraph2,
        media,
      },
    });

    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

/* ======================= */
/* DELETE */
/* ======================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const existing = await prisma.ai_powered.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    // delete media file
    deleteFile(existing.media);

    await prisma.ai_powered.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};