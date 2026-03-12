const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

/* =============================== */
/* HELPER: Delete File */
/* =============================== */
const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  const fullPath = path.join(__dirname, "..", filePathFromDb);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error("Error deleting file:", err.message);
    }
  }
};

/* =============================== */
/* HELPER: Strip HTML */
/* =============================== */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return null;

  const clean = value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.length ? clean : null;
};

/* =============================== */
/* GET ALL */
/* =============================== */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.image_button_section.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================== */
/* GET ONE */
/* =============================== */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.image_button_section.findUnique({
      where: { id },
    });

    if (!record)
      return res.status(404).json({ message: "Not found" });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================== */
/* CREATE */
/* =============================== */
exports.create = async (req, res) => {
  try {
    const cleanHeading = stripHtml(req.body.heading);
    const cleanParagraph = stripHtml(req.body.paragraph);

    if (!cleanHeading) {
      return res.status(400).json({ message: "Heading is required" });
    }

    const imagePath = req.file
      ? `uploads/${req.file.filename}`
      : null;

    const created = await prisma.image_button_section.create({
      data: {
        heading: cleanHeading,
        paragraph: cleanParagraph,
        image: imagePath,
      },
    });

    res.status(201).json({
      message: "Created successfully",
      data: created,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================== */
/* UPDATE */
/* =============================== */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.image_button_section.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Not found" });

    let imagePath = existing.image;

    // If new image uploaded
    if (req.file) {
      if (existing.image) {
        deleteFile(existing.image);
      }
      imagePath = `uploads/${req.file.filename}`;
    }

    const updated = await prisma.image_button_section.update({
      where: { id },
      data: {
        heading:
          req.body.heading !== undefined
            ? stripHtml(req.body.heading)
            : existing.heading,

        paragraph:
          req.body.paragraph !== undefined
            ? stripHtml(req.body.paragraph)
            : existing.paragraph,

        image: imagePath,
      },
    });

    res.json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================== */
/* DELETE */
/* =============================== */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.image_button_section.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Not found" });

    if (existing.image) {
      deleteFile(existing.image);
    }

    await prisma.image_button_section.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};